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

app.use('/', Usuario);
app.use('/sup', Supervisor);
app.use('/pro', Promotor);
app.use('/adm', Administrador);


httpsServer.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} utilizando HTTPS`);
});
