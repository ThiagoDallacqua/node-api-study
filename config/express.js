var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var morgan = require('morgan');
var logger = require('../servicos/logger.js');

module.exports = function() {
  var app = express();

  app.use(morgan("common", {
    stream: {
      write: function(mensagem) {
        logger.info(mensagem)
      }
    }
  }));
  app.use(bodyParser.json());
  app.use(expressValidator());

  consign()
  .include('controllers')
  .then('infra')
  .then('servicos')
  .into(app);

  return app
}
