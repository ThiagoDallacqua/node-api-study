var app = require('./config/express')();
var porta = process.env.PORT || 3000;

app.listen(3000, function() {
  var host = app.address().address;
  var port = app.address().port;
  
  console.log(`Servidor rodando no endereço ${host}:${port}`);
});
