var soap = require('soap');

class CorreiosSOAPClient {
  constructor() {
    this._url = 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl'
  }

  calculaPrazo(args, callback){
    soap.createClient(this._url, function(err, cliente) {
      console.log('Cliente SOAP criado');

      cliente.CalcPrazo(args, callback)
    });
  }
}

module.exports = function() {
  return CorreiosSOAPClient
}
