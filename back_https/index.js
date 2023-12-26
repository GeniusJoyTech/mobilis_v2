const express = require('express');
const cors = require('cors');
const https = require('https');
const fs = require('fs');

const Usuario = require('./rotas/usuario.js');
const Supervisor = require('./rotas/supervisor.js');
const Promotor = require('./rotas/promotor.js');
const Administrador = require('./rotas/administrador.js');

const app = express();
const PORT = 5000;

const privateKey = fs.readFileSync('mobilis_b-privateKey.key');
const certificate = fs.readFileSync('mobilis_b.crt');

const credentials = { key: privateKey, cert: certificate};

const httpsServer = https.createServer(credentials, app);

app.use(cors());
app.use(express.json());


const checkCargo = (req, res, next, cargo) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, 'segredo');
    if (decoded.cargo !== cargo) {
      return res.status(403).json({ message: 'Usuário não é supervisor' });
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};


app.use('/', Usuario);
app.use('/sup', (req, res, next) => {
  checkCargo(req, res, next, 'supervisor');
}, Supervisor);

app.use('/pro', (req, res, next) => {
  checkCargo(req, res, next, 'promotor');
}, Promotor);

app.use('/adm', (req, res, next) => {
  checkCargo(req, res, next, 'administrador');
}, Administrador);

httpsServer.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} utilizando HTTPS`);
});
