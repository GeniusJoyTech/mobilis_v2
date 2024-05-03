const Router = require('express');
const router = Router();
const jwt = require("jsonwebtoken");

const bd = require('../../db/sql');
const { pool, query: q } = bd;

// -[X] Ver
router.get('/ver', (req, res) => {
    const query = "SELECT id_agenda, id_usuario, nome, id_criador, roteirista, id_loja, loja, rua, numero, id_atividade, descricao, observacao, tipo, ciclo, diavisita FROM v_sup_vis;";

    q(query)
        .then(results => {
            res.status(200).json(results);
            
        })
        .catch(err => {
            res.status(500).json({ error: 'Erro ao executar a consulta', details: err });
        });
});
// -[X] Incluir
router.post('/incluir', async (req, res) => {
    const token = req.header('Authorization');
    const decoded = jwt.verify(token, 'segredo');
    const { id_usuario, id_loja, id_atividade, diavisita, ciclo } = req.body;
    const query = `INSERT INTO agenda (id_usuario, id_criador, id_loja, id_atividade, diavisita, ciclo) 
    values (${id_usuario}, ${decoded.id_usuario}, ${id_loja}, ${id_atividade},'${diavisita}', ${ciclo})`;
    console.log(query);
    q(query)
        .then(results => {
            res.status(200).json(results);
        })
        .catch(err => {
            res.status(500).json({ error: 'Erro ao executar a consulta', details: err });
            console.log(err);
        });
});

// -[X] Editar
router.post('/editar', (req, res) => {
    const { id_agenda, id_atividade, id_loja, id_usuario, id_criador, ciclo, diavisita } = req.body;

    // Verifique se o id está presente nos parâmetros da solicitação
    if (!id_agenda) {
        return res.status(400).send('O campo id é obrigatório');
    }

    const query = `UPDATE agenda SET id_atividade = ${id_atividade}, id_loja = ${id_loja}, id_usuario = ${id_usuario}, id_criador = ${id_criador}, ciclo = ${ciclo}, diavisita = '${diavisita}' WHERE id_agenda = ${id_agenda}`;
    console.log(query);
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
router.post('/deletar', async (req, res) => {
    const { id_agenda } = req.body;

    // Verifique se o id está presente nos parâmetros da solicitação
    if (!id_agenda) {
        return res.status(400).send('O campo id é obrigatório');
    }

    const query = `DELETE from agenda where id_agenda = ${id_agenda}`;
    console.log(query);
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

module.exports = router;