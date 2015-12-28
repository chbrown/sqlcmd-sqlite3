## sqlcmd-sqlite3

[![Travis CI Build Status](https://travis-ci.org/chbrown/sqlcmd-sqlite3.svg)](https://travis-ci.org/chbrown/sqlcmd-sqlite3)
[![npm version](https://badge.fury.io/js/sqlcmd-sqlite3.svg)](https://www.npmjs.com/package/sqlcmd-sqlite3)

[sqlcmd](https://github.com/chbrown/sqlcmd) for [SQLite](https://www.sqlite.org/index.html).

    npm install --save sqlcmd-sqlite3

Supports [SQLite](https://www.sqlite.org/index.html) via [node-sqlite3](https://github.com/mapbox/node-sqlite3).


## Configuration

With options object:

    var sqlcmd = require('sqlcmd-sqlite3');
    var db = new sqlcmd.Connection({filename: 'local.db'});


## License

Copyright 2015 Christopher Brown. [MIT Licensed](http://chbrown.github.io/licenses/MIT/#2015).
