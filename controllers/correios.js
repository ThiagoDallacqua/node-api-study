var logger = require('../servicos/logger.js')

module.exports = function(app) {
  app.post('/correios/calculo-prazo', function(req, res) {
    var dadosDaEntrega = req.body;
    var correiosSOAPClient = new app.servicos.CorreiosSOAPClient();

    correiosSOAPClient.calculaPrazo(dadosDaEntrega.cep, function(erro, resultado) {
      if (erro) {
        res.status(500).send(erro);
        logger.error(`Erro ocorrido ao consultar prazo de entrega: ${erro}`)
        return
      }

      req.assert("cep", "É obrigatório informar o CEP para calcular o prazo de entrega")
        .notEmpty();

      var erros = req.validationErrors();

      if (erros) {
        console.log("Ocorreram erros de validação");
        logger.error(`Ocorreram erros na validação com o cliente: ${erros}`);

        res.status(400).send(erros);
        return
      }

      console.log('Prazo calculado');
      res.json(resultado);
    });
  })
}
