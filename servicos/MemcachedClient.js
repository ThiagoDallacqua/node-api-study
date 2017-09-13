var memcached = require('memcached');

function createMemcachedClient() {
  var client = new memcached('localhost:11211', {
    retries: 10, //número de tentativas de consultas no cluster
    retry: 10000, //tempo, em milisegundos, para tentar consultar um nó do cluster
    remove: true //remover, ou não, um nó morto no cluster
  });

  return client;
}

module.exports = function() {
  return createMemcachedClient
}
