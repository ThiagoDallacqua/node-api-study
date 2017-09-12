class PagamentoDAO {
  constructor(connection) {
    this._connection = connection;
  }

  lista(callback){
    this._connection.query('select * from pagamentos', callback);
  }

  salva(pagamento, callback){
    this._connection.query('INSERT INTO pagamentos SET ?', pagamento, callback)
  }

  atualiza(pagamento, callback){
    this._connection.query('UPDATE pagamentos SET status = ? where id = ?',
      [pagamento.status, pagamento.id], callback)
  }

  buscaPorId(pagamento, callback){
    this._connection.query('select * from pagamentos where id = ?', pagamento.id, callback)
  }
}

module.exports = function() {
  return PagamentoDAO
}
