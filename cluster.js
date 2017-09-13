var cluster = require('cluster');
var os = require('os');

var cpus = os.cpus();

console.log('executando thread');

if (cluster.isMaster) {
  console.log('thread master');
  cpus.forEach(function() {
    cluster.fork();
  });

  cluster.on('listening', worker => {
    console.log(`cluster conectado com o id ${worker.process.pid}`);
  });

  cluster.on('exit', worker => {
    console.log(`cluster de id ${worker.process.id} desconectado`);
    console.log('novo cluster sendo conectado');
    cluster.fork()
  })
}else {
  console.log('thread slave');
  require('./index.js')
}
