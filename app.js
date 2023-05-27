const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('./conexao');

const app = express();

require('dotenv').config();
app.use(express.json());

// JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  });
}

// cadastro de usuário
app.post('/api/users', (req, res) => {
  const user = req.body;
  db.query('INSERT INTO Usuario SET ?', user, (err, result) => {
    if (err) {
      console.error('Erro ao inserir dados na tabela Usuario: ' + err);
      return res.sendStatus(500);
    }
    return res.sendStatus(201);
  });
});

// consulta de todos os usuários
app.get('/api/users', authenticateToken, (req, res) => {
  db.query('SELECT * FROM Usuario', (err, results) => {
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
  db.query('SELECT * FROM Usuario WHERE codigo = ?', id, (err, results) => {
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
  db.query('UPDATE Usuario SET ? WHERE codigo = ?', [user, id], (err, result) => {
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
  db.query('DELETE FROM Usuario WHERE codigo = ?', id, (err, result) => {
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

  // Verifique as credenciais do usuário e gere o token de acesso JWT

  if (username === 'admin' && password === 'admin') {
    const user = { username: username };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    return res.json({ accessToken: accessToken });
  } else {
    return res.sendStatus(401);
  }
});

// rota para consultar álbuns preferidos de um usuário
app.get('/api/users/:userId/preferidos', authenticateToken, (req, res) => {
  const userId = req.params.userId;
  db.query('SELECT * FROM Preferidos WHERE userId = ?', userId, (err, results) => {
    if (err) {
      console.error('Erro ao consultar dados da tabela Preferidos: ' + err);
      return res.sendStatus(500);
    }
    return res.json(results);
  });
});

// rota para adicionar álbum preferido a um usuário
app.post('/api/users/:userId/preferidos', authenticateToken, (req, res) => {
  const userId = req.params.userId;
  const albumId = req.body.albumId;

  // Verifique se o álbum já está marcado como preferido pelo usuário

  db.query('INSERT INTO Preferidos (userId, albumId) VALUES (?, ?)', [userId, albumId], (err, result) => {
    if (err) {
      console.error('Erro ao inserir dados na tabela Preferidos: ' + err);
      return res.sendStatus(500);
    }
    return res.sendStatus(201);
  });
});

// rota para remover álbum preferido de um usuário
app.delete('/api/users/:userId/preferidos/:albumId', authenticateToken, (req, res) => {
  const userId = req.params.userId;
  const albumId = req.params.albumId;

  db.query('DELETE FROM Preferidos WHERE userId = ? AND albumId = ?', [userId, albumId], (err, result) => {
    if (err) {
      console.error('Erro ao excluir dados da tabela Preferidos: ' + err);
      return res.sendStatus(500);
    }
    return res.sendStatus(200);
  });
});

// inicia o servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
