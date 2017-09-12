var mysql = require('mysql');

function createDBConnection(app) {
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'payfast'
  });
}

module.exports = function() {
  return createDBConnection;
}
