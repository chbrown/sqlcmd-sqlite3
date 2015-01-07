/*jslint node: true */
var sqlite3 = require('sqlite3');
var util = require('util');
var BaseConnection = require('sqlcmd/connection');

/** new Connection({filename: string, mode: <sqlite3_flags>})
*/
function Connection(options) {
  BaseConnection.call(this, options);
  if (options && options.filename) {
    this.database = new sqlite3.Database(options.filename, options.mode, options.callback);
  }
}
util.inherits(Connection, BaseConnection);

/** Connection#executeSQL(sql: string,
                          args: any[] | {[index: string]: any},
                          callback: (error: Error, rows: object[]))

Execute a plain SQL query, potentially with prepared parameters, against this
sqlcmd-sqlite3.Connection.
*/
Connection.prototype.executeSQL = function(sql, args, callback) {
  this.emit('log', {level: 'info', format: 'Executing SQL "%s"', args: [sql]});
  this.database.all(sql, args, callback);
};

Connection.prototype.executeCommand = function(command, callback) {
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
};

module.exports = Connection;
