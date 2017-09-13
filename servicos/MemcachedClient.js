var memcached = require('memjs');
var memcachedLocal = require('memcached');

function createMemcachedClient() {
  if (!process.env.NODE_ENV) {
    var client = new memcachedLocal('localhost:11211', {
      retries: 10, //número de tentativas de consultas no cluster
      retry: 10000, //tempo, em milisegundos, para tentar consultar um nó do cluster
      remove: true //remover, ou não, um nó morto no cluster
    });

    return client
  }

  if (process.env.NODE_ENV == 'production') {
    var client = new memcached(process.env.MEMCACHEDCLOUD_SERVERS, {
      username: process.env.MEMCACHEDCLOUD_USERNAME,
      password: process.env.MEMCACHEDCLOUD_PASSWORD,
      retries: 10, //número de tentativas de consultas no cluster
      retry: 10000, //tempo, em milisegundos, para tentar consultar um nó do cluster
      remove: true //remover, ou não, um nó morto no cluster
    });

    return client
  }
}

module.exports = function() {
  return createMemcachedClient
}
