import {Database} from 'sqlite3';
import {Command, Connection as BaseConnection, ConnectionOptions} from 'sqlcmd';

export interface SQLite3ConnectionOptions extends ConnectionOptions {
  /** Filepath to sqlite3 database file */
  filename: string;
  /** Mode to use for database file if it's created */
  mode?: number;
  /** Optional callback when the sqlite3.Database is ready */
  callback?: (err?: Error) => void;
}

export class Connection extends BaseConnection {
  database: Database;
  constructor(options: SQLite3ConnectionOptions) {
    super(options);
    this.database = new Database(options.filename, options.mode, options.callback);
  }

  /**
  Execute a plain SQL query, potentially with prepared parameters, against this
  sqlcmd-sqlite3.Connection.
  */
  executeSQL(sql: string,
             args: any[] | {[index: string]: any},
             callback: (error: Error, rows?: any[]) => void): void {
    this.emit('log', {level: 'info', format: 'Executing SQL "%s"', args: [sql]});
    this.database.all(sql, args, callback);
  }

  executeCommand<R>(command: Command<R>,
                    callback: (error: Error, result?: R) => void): void {
    // sqlite3 is cool with getting some SQL with $variables and then an object
    // mapping out those parameters, but it wants the object keys to be $-prefixed,
    // like the variable references.
    var sql = command.toSQL();
    var args = {};
    for (var name in command.parameters) {
      args['$' + name] = command.parameters[name];
    }
    this.emit('log', {level: 'info', format: 'Executing SQL "%s" with variables: %j', args: [sql, args]});
    // self.emit('log', {level: 'error', format: 'Query error: %j', args: [err]});
    // self.emit('log', {level: 'debug', format: 'Query result: %j', args: [result]});
    this.database.all(sql, args, callback);
  }
}
