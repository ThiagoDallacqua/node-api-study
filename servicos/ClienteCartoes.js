var restify = require('restify');
var clients = require('restify-clients');

class ClienteCartoes {
  constructor() {
    this._cliente = clients.createJsonClient({
      url: 'https://node-api-study-cardfast.herokuapp.com',
      version: '~1.0'
    });
  }

  autoriza(cartao, callback) {
    this._cliente.post('/cartoes/autoriza', cartao, callback)
    return
  }
}


module.exports = function() {
  return ClienteCartoes
}
