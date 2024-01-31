const Router = require('express');
const router = Router();

const bd = require('../db/sql');

const { query: q } = bd;
// -[X] RF 09 - Gerenciar usuário
// -[X] Ver
router.get('/func/ver', (req, res) => {
    const query = "SELECT * FROM v_usuario;";

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
    const { nome, cracha, superior, endereco, email } = req.body;
    const query = `INSERT INTO db_usuario (nome, cargo, cracha, superior, endereco, email)
            VALUES ('${nome}', 'Promotor', '${cracha}', '${superior}', '${endereco}', '${email}');`

    q(query)
        .then(results => {
            res.status(200).json(results);
        })
        .catch(err => {
            res.status(500).json({ error: 'Erro ao executar a consulta', details: err });
        });
})
// -[X] Editar
router.post('/func/editar', (req, res) => {
    const { nome, cracha, superior, endereco, email, id: id_usu } = req.body;

    // Verifique se o id está presente nos parâmetros da solicitação
    if (!id_usu) {
        return res.status(400).send('O campo id é obrigatório');
    }

    const query = `UPDATE db_usuario SET nome = '${nome}', cracha = '${cracha}', superior = '${superior}', endereco = '${endereco}', email = '${email}' WHERE id_usu = ${id_usu}`;

    // Executar a query
    q(query)
        .then(results => {
            res.status(200).json(results);
        })
        .catch(err => {
            res.status(500).json({ error: 'Erro ao executar a consulta', details: err });
        });
});
// -[X] Excluir
router.post('/func/deletar', (req, res) => {
    const id = req.body.id_usu;
    if (!id) {
        return res.status(400).send('O campo id é obrigatório');
    }
    const query = `DELETE FROM db_usuario  WHERE id_usu = ${id}`;
    q(query)
        .then(results => {
            res.status(200).json(results);
        })
        .catch(err => {
            res.status(500).json({ error: 'Erro ao executar a consulta', details: err });
        });
});
module.exports = router;
