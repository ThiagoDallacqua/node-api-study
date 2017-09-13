var mysql = require('mysql');

function createDBConnection(app) {
  if (!process.env.NODE_ENV) {
    return mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '1234',
      database: 'payfast'
    });
  }

  if (process.env.NODE_ENV == 'production') {
    return mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PSWD,
      database: process.env.DB_NAME
    });
  }
}

module.exports = function() {
  return createDBConnection;
}
