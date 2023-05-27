const db = require('./conexao');

function getUserById(id, callback) {
  db.query('SELECT * FROM Usuarios WHERE codigo = ?', id, (err, results) => {
    if (err) {
      console.error('Erro ao consultar dados da tabela Usuarios: ' + err);
      return callback(err, null);
    }
    if (results.length === 0) {
      return callback('Usuário não encontrado', null);
    }
    return callback(null, results[0]);
  });
}

module.exports = {
  getUserById,
};
