var winston =  require('winston');
var fs = require('fs');

if (!fs.existsSync('logs')) {
  fs.mkdirSync('logs')
}

module.exports = new winston.Logger({
    transports: [
      new (winston.transports.File)({
        name:"info-file",
        level: "info",
        filename: "logs/payfastInfo.log",
        maxsize: 100000,
        maxFiles: 10
      }),
      new (winston.transports.File)({
        name:"error-file",
        level: "error",
        filename: "logs/payfastError.log",
        maxsize: 100000,
        maxFiles: 10
      }),
      new (winston.transports.File)({
        name:"warning-file",
        level: "warn",
        filename: "logs/payfastWarning.log",
        maxsize: 100000,
        maxFiles: 10
      })
    ]
  });
