var fs = require('fs');

fs.readFile('notbad.jpg', function(err, buffer) {
  console.log('Arquivo lido');

  fs.writeFile('imagem2.jpg', buffer, function(erro) {
    console.log('Arquivo escrito');
  })
});
