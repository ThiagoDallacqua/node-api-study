var restify = require('restify');
var clients = require('restify-clients');

class ClienteCartoes {
  constructor() {
    this._cliente = clients.createJsonClient({
      url: 'http://localhost:3001',
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
