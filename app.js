const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('./conexao');

const app = express();
const MinhaSenha = 'ifrn2@23';

require('dotenv').config();
app.use(express.json());


// JWT
function authenticateToken(req, res, next) {
  const token = req.headers['x-access-token'];
  if (!token) {
    res.status(401).json({
      auth: false,
      message: 'Nenhum token de autenticação informado.',
    });
  } else {
    jwt.verify(token, MinhaSenha, function (err, decoded) {
      if (err) {
        res.status(500).json({ auth: false, message: 'Token inválido.' });
      } else {
        console.log('Metodo acessado por ' + decoded.nome);
        next();
      }
    });
  }
}


// cadastro de usuário
app.post('/api/users', (req, res) => {
  const user = req.body;
  db.query('INSERT INTO Usuarios (nome, email, senha) VALUES (?, ?, ?)', [user.nome, user.email, user.senha], (err, result) => {
    if (err) {
      console.error('Erro ao inserir dados na tabela Usuario: ' + err);
      return res.sendStatus(500);
    }
    return res.sendStatus(201);
  });
});

// consulta de todos os usuários
app.get('/api/users', authenticateToken, (req, res) => {
  db.query('SELECT * FROM Usuarios', (err, results) => {
    if (err) {
      console.error('Erro ao consultar dados da tabela Usuario: ' + err);
      return res.sendStatus(500);
    }
    return res.json(results);
  });
});

// rota para consulta de um usuário específico
app.get('/api/users/:id', authenticateToken, (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM Usuarios WHERE codigo = ?', id, (err, results) => {
    if (err) {
      console.error('Erro ao consultar dados da tabela Usuario: ' + err);
      return res.sendStatus(500);
    }
    if (results.length === 0) {
      return res.sendStatus(404);
    }
    return res.json(results[0]);
  });
});

// atualização de um usuário
app.put('/api/users/:id', authenticateToken, (req, res) => {
  const id = req.params.id;
  const user = req.body;
  db.query('UPDATE Usuarios SET ? WHERE codigo = ?', [user, id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar dados na tabela Usuario: ' + err);
      return res.sendStatus(500);
    }
    return res.sendStatus(200);
  });
});

// rota para exclusão de um usuário
app.delete('/api/users/:id', authenticateToken, (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM Usuarios WHERE codigo = ?', id, (err, result) => {
    if (err) {
      console.error('Erro ao excluir dados da tabela Usuario: ' + err);
      return res.sendStatus(500);
    }
    return res.sendStatus(200);
  });
});

// login
app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

// verifique as credenciais do usuário e gere o token de acesso JWT

  if (username === 'admin' && password === 'admin') {
    const user = { username: username };
    const accessToken = jwt.sign(user, MinhaSenha);
    return res.json({ accessToken: accessToken });
  } else {
    return res.sendStatus(401);
  }
});
 //...
 // consulta de todos os álbuns
app.get('/api/albums', authenticateToken, (req, res) => {
  db.query('SELECT * FROM Albuns', (err, results) => {
    if (err) {
      console.error('Erro ao consultar dados da tabela Albuns: ' + err);
      return res.sendStatus(500);
    }
    return res.json(results);
  });
});

// cadastro de um álbum
app.post('/api/albums', authenticateToken, (req, res) => {
  const album = req.body;
  db.query('INSERT INTO Albuns SET ?', album, (err, result) => {
    if (err) {
      console.error('Erro ao inserir dados na tabela Albuns: ' + err);
      return res.sendStatus(500);
    }
    return res.sendStatus(201);
  });
});

// atualização de um álbum
app.put('/api/albums/:id', authenticateToken, (req, res) => {
  const id = req.params.id;
  const album = req.body;
  db.query('UPDATE Albuns SET ? WHERE cod_album = ?', [album, id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar dados na tabela Albuns: ' + err);
      return res.sendStatus(500);
    }
    return res.sendStatus(200);
  });
});

// rota para exclusão de um álbum
app.delete('/api/albums/:id', authenticateToken, (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM Albuns WHERE cod_album = ?', id, (err, result) => {
    if (err) {
      console.error('Erro ao excluir dados da tabela Albuns: ' + err);
      return res.sendStatus(500);
    }
    return res.sendStatus(200);
  });
});


// inicia o servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
