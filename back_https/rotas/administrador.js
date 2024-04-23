const Router = require('express');
const router = Router();

const bd = require('../db/sql');

const { query: q } = bd;
// -[X] RF 09 - Gerenciar usuário
// -[X] Ver
router.get('/func/ver', (req, res) => {
    const query = "SELECT * FROM v_usuario_admin;";

    q(query)
        .then(results => {
            res.status(200).json(results);
        })
        .catch(err => {
            res.status(500).json({ error: 'Erro ao executar a consulta', details: err });
        });
});
router.get('/sup/ver', (req, res) => {
    const query = "SELECT * FROM v_supervisores;";

    q(query)
        .then(results => {
            res.status(200).json(results);
        })
        .catch(err => {
            res.status(500).json({ error: 'Erro ao executar a consulta', details: err });
        });
});
// -[X] Incluir
router.post('/func/incluir', (req, res) => {

    const { id_superior, status, nome, cracha, cep, numero, rua, cargo, cidade, email } = req.body;
    const query = `INSERT INTO usuario
                    (id_superior, status, nome, cracha, cep, numero, rua, cargo, cidade, email, senha)
                    VALUES 
                    (
                        ${id_superior}, 
                        '${status}', 
                        '${nome}', 
                        '${cracha}', 
                        '${cep}', ${numero}, 
                        '${rua}', 
                        '${cargo}', 
                        '${cidade}', 
                        '${email}', 
                        '123456'
                    );`

    q(query)
        .then(results => {
            res.status(200).json(results);
        })
        .catch(err => {
            res.status(500).json({ error: 'Erro ao executar a consulta', details: err });
            console.log(err);
        });
})
// -[X] Editar
router.post('/func/editar', (req, res) => {
    const { nome, cracha, id_superior, cep, numero, rua, cidade, email, id_usuario } = req.body;

    // Verifique se o id está presente nos parâmetros da solicitação
    if (!id_usuario) {
        return res.status(400).send('O campo id é obrigatório');
    }

    const query = `UPDATE usuario SET nome = '${nome}', cracha = '${cracha}', cep = '${cep}', numero = '${numero}', rua = '${rua}', cidade = '${cidade}', id_superior = '${id_superior}', email = '${email}' WHERE id_usuario = ${id_usuario}`;

    // Executar a query
    q(query)
        .then(results => {
            res.status(200).json(results);
        })
        .catch(err => {
            res.status(500).json({ error: 'Erro ao executar a consulta', details: err });
            console.log(err);
        });
});
// -[X] Excluir
router.post('/func/deletar', (req, res) => {
    const id = req.body.id_usuario;
    if (!id) {
        return res.status(400).send('O campo id é obrigatório');
    }
    const query = `DELETE FROM usuario  WHERE id_usuario = ${id}`;
    q(query)
        .then(results => {
            res.status(200).json(results);
        })
        .catch(err => {
            res.status(500).json({ error: 'Erro ao executar a consulta', details: err });
        });
});
module.exports = router;
