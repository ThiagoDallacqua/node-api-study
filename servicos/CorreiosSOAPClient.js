var soap = require('soap');

class CorreiosSOAPClient {
  constructor() {
    this._url = 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl'
  }

  calculaPrazo(args, callback){
    var data = {
      "nCdServico": "40010",
    	"sCepOrigem": "77006100",
      "sCepDestino": args
    }

    soap.createClient(this._url, function(err, cliente) {
      console.log('Cliente SOAP criado');

      cliente.CalcPrazo(data, callback)
    });
  }
}

module.exports = function() {
  return CorreiosSOAPClient
}
