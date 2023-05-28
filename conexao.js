const mysql = require('mysql2');
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '4321',
  database: 'APIwebbackend',
};

const db = mysql.createConnection(dbConfig);

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados: ' + err.stack);
    return;
  }
  console.log('Conexão com o banco de dados estabelecida com sucesso');
});

module.exports = db;

console.log(dbConfig)