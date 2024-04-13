const Router = require('express');
const router = Router();
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const util = require("util");

const bd = require('../db/sql');

const { query: q } = bd;

const secret = "segredo";
// # Usuário 
// -[X] RF 01 - Login
router.post('/login', (req, res) => {
    const { email, senha } = req.body;
    const query = `SELECT id_usuario, nome, email, senha, cargo, cracha FROM usuario where email = ? and senha = ?`;

    q(query, [email, senha])
        .then(results => {
            if (results.length === 0) {
                res.status(401).json("Algo não saiu como esperado, verifique seus dados de acesso.")
            }
            else {
                const payload = { userId: results[0].id_usu, username: results[0].nome, cargo: results[0].cargo, id_usuario: results[0].id_usuario};
                const token = jwt.sign(payload, secret, { expiresIn: '30w' });
                res.header('Authorization', `${token}`);
                res.status(200).json({ token });
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'Erro ao executar a consulta', details: err });
            console.log(err);
        });
});
// -[] RF 02 - Logout
//router.post('/logout', (req, res) => {
// Remover o token do lado do cliente (por exemplo, excluindo cookies ou removendo do armazenamento local)
//});

// -[X] RF 03 - Troca de senha
router.post('/senha/editar', (req, res) => {
    const email = req.body.email;
    const query = 'select email from db_usuario where email = ?';

    q(query, [email])
        .then(results => {
            if (results.length > 0) {
                const tokenPayload = {
                    email: email,
                };

                const token = jwt.sign(tokenPayload, secret, { expiresIn: '1h' });

                
                const smtp = nodemailer.createTransport({
                    host: "smtp.office365.com",
                    port: 587,
                    secure: false,
                    auth: {
                        user: "emdominus@outlook.com",
                        pass: "P0r69r90",
                    },
                });

                const configEmail = {
                    from: "emdominus@outlook.com",
                    to: email,
                    subject: "Redefinir Senha",
                    html: `<p>Olá,
                            <br>Clique no link abaixo para redefinir sua senha:
                            <br><a href="${'localhost:5173/novasenha'}">${'https://localhost:5173/novasenha'}</a></p>
                            <p>Por gentileza utilize o token abaixo para realizar a troca da senha:
                            <br>
                            <br>${token}</p>
                            <br><p>copie o token acima e cole no local mencionado.</p>`,
                };

                const sendMailPromise = util.promisify(smtp.sendMail).bind(smtp);

                sendMailPromise(configEmail)
                    .then(() => {
                        smtp.close();
                        res.status(200).json({ message: 'E-mail enviado com sucesso' });
                    })
                    .catch(err => {
                        console.error(err);
                        smtp.close();
                        res.status(500).json({ error: 'Erro ao enviar e-mail', details: err });
                    });
            } else {
                res.status(200).json({ message: 'Tabela está vazia' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Erro ao executar a consulta', details: err });
        });
});
router.post('/nova/senha', async (req, res) => {
    const {token, senha} = req.body;

        const decoded = jwt.verify(token, secret);
        const query = `UPDATE db_usuario SET senha = ? where email = ?`;

    q(query, [senha, decoded.email])
        .then(results => {
                res.status(200).json(results);           
        })
        .catch(err => {
            res.status(500).json({ error: 'Erro ao executar a consulta', details: err });
        });
});
module.exports = router;