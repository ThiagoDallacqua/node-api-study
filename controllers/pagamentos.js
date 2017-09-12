module.exports = function(app) {
  app.get('/pagamentos', function(req, res) {
    console.log('Requisição de teste recebida');

    res.send('OK')
  });

  app.post('/pagamentos/pagamento', function(req, res) {
    req.assert("pagamento.forma_de_pagamento", "Forma de pagamento é obrigatório")
      .notEmpty();

    req.assert("pagamento.valor", "Valor obrigatório, e deve ser decimal")
      .notEmpty()
      .isFloat();

    var erros = req.validationErrors();

    if (erros) {
      console.log("Ocorreram erros de validação");

      res.status(400).send(erros);
      return
    }

    var pagamento = req.body["pagamento"];

    console.log('processando requisição de um novo pagamento');

    pagamento.status = 'CRIADO';
    pagamento.data = new Date;

    var connection = app.infra.connectionFactory();
    var pagamentoDAO = new app.infra.PagamentoDAO(connection);

    pagamentoDAO.salva(pagamento, function(err, result) {
      if (err) {
        console.log(`Erro ao persistir no DB: ${err}`);
        res.status(500).send(err)
      }else{
        pagamento.id = result.insertId;
        console.log('pagamento criado');

        if (pagamento.forma_de_pagamento == 'cartao') {
          var cartao = req.body;
          var clienteCartoes = new app.servicos.ClienteCartoes();

          clienteCartoes.autoriza(cartao, function(error, request, response, retorno) {
            if (error) {
              console.log(error);
              res.status(400).send(error);
              return;
            }
            console.log(retorno);

            res.location(`/pagamentos/pagamento/${pagamento.id}`);

            var response = {
              dados_do_pagamento: pagamento,
              cartao: retorno,
              links: [
                {
                  href: `http://localhost:3000/pagamentos/pagamento/${pagamento.id}`,
                  rel: 'confirmar',
                  method: 'PUT'
                },
                {
                  href: `http://localhost:3000/pagamentos/pagamento/${pagamento.id}`,
                  rel: 'cancelar',
                  method: 'DELETE'
                }
              ]
            }

            res.status(201).json(response);
            return;
          });
        } else{
          res.location(`/pagamentos/pagamento/${pagamento.id}`);

          var response = {
            dados_do_pagamento: pagamento,
            links: [
              {
                href: `http://localhost:3000/pagamentos/pagamento/${pagamento.id}`,
                rel: 'confirmar',
                method: 'PUT'
              },
              {
                href: `http://localhost:3000/pagamentos/pagamento/${pagamento.id}`,
                rel: 'cancelar',
                method: 'DELETE'
              }
            ]
          }

          res.status(201).json(response)
        }
      }
    })
  });

  app.put('/pagamentos/pagamento/:id', function(req, res) {
    var id = req.params.id;
    var pagamento = {};

    pagamento.id = id;
    pagamento.status = 'CONFIRMADO';

    var connection = app.infra.connectionFactory();
    var pagamentoDAO = new app.infra.PagamentoDAO(connection);

    pagamentoDAO.atualiza(pagamento, function(err, result) {
      if (err) {
        res.status(500).send(err);
        return
      }

      console.log('pagamento confirmado');
      res.send(pagamento);
    })

  });

  app.delete('/pagamentos/pagamento/:id', function(req, res) {
    var id = req.params.id;
    var pagamento = {};

    pagamento.id = id;
    pagamento.status = 'CANCELADO';

    var connection = app.infra.connectionFactory();
    var pagamentoDAO = new app.infra.PagamentoDAO(connection);

    pagamentoDAO.atualiza(pagamento, function(err, result) {
      if (err) {
        res.status(500).send(err);
        return
      }

      console.log('pagamento cancelado');
      res.status(204).send(pagamento);
    })
  });
}
