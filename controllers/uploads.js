var fs = require('fs');

module.exports = function(app) {
  app.post('/upload/image', function(req, res) { // O Content-Type deve ser application/octet-stream
    console.log('recebendo imagem');

    var filename = req.headers.filename; // Deve ter um segundo Header chamado filename com o nome do arquivo

    console.log(filename);
    req.pipe(fs.createWriteStream(`files/${filename}`))
      .on('finish', function(err) {
        if (err) {
          console.log(err);

          res.status(500).send(err);
          return
        }
        console.log('Arquivo escrito com sucesso!');

        res.status(201).send('OK');
      });
  });
}
