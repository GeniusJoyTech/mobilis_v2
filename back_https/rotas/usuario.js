const Router = require('express');
const router = Router();
const jwt = require("jsonwebtoken");

const bd = require('../db/sql');

const { query: q } = bd;

const secret = "segredo"
// # Usuário 
// -[X] RF 01 - Login
router.post('/login', (req, res) => {
    const {email, senha} = req.body;
    const query = `SELECT id_usu, nome, email, senha, cargo FROM db_usuario where email = ? and senha = ?`; 

    q(query, [email, senha])
        .then(results => {
            if(results.length === 0){
                res.status(401).json("Algo não saiu como esperado, verifique seus dados de acesso.")    
            }
            else{
                const payload = { userId: results[0].id_usu, username: results[0].nome, cargo: results[0].cargo};
                const token = jwt.sign(payload, secret, { expiresIn: '30w' });
                res.header('Authorization', `${token}`);
                res.status(200).json({token});
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'Erro ao executar a consulta', details: err });
        });
    });
// -[] RF 02 - Logout
//router.post('/logout', (req, res) => {
    // Remover o token do lado do cliente (por exemplo, excluindo cookies ou removendo do armazenamento local)
//});

// -[X] RF 03 - Troca de senha
router.post('/senha/editar', (req, res) => {
    const {senha, cracha, email} = req.body;
    const query = 'UPDATE db_usuario SET senha = ? where cracha = ? and email = ?';
    q(query, [senha, cracha, email])
    .then(results => {
        res.status(200).json(results);
    })
    .catch(err => {
        res.status(500).json({ error: 'Erro ao executar a consulta', details: err });
    });
});

module.exports = router;