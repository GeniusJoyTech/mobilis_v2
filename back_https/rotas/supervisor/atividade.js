const Router = require('express');

const router = Router();

const bd = require('../../db/sql');

const { pool, query: q } = bd;

// -[X] Ver
router.get('/ver', (req, res) => {
    const query = "SELECT * FROM atividade;";

    q(query)
        .then(results => {
            res.status(200).json(results);
        })
        .catch(err => {
            res.status(500).json({ error: 'Erro ao executar a consulta', details: err });
        });
});
// -[X] Incluir
router.post('/incluir', (req, res) => {
    const { descricao, observacao } = req.body;
    const query = `INSERT INTO atividade (descricao, tipo, observacao) 
    VALUES ('${descricao}', 'Promotor', '${observacao}');`

    q(query)
        .then(results => {
            res.status(200).json(results);
        })
        .catch(err => {
            res.status(500).json({ error: 'Erro ao executar a consulta', details: err });
        });
})
// -[X] Editar
router.post('/editar', (req, res) => {
    const { id_atividade, descricao, tipo, observacao } = req.body;
    // Verifique se o id está presente nos parâmetros da solicitação
    if (!id_atividade) {
        return res.status(400).send('O campo id é obrigatório');
    }

    const query = `UPDATE atividade
                    SET descricao = '${descricao}', tipo = '${tipo}', observacao = '${observacao}'
                    WHERE id_atividade = ${id_atividade}`;

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
router.post('/deletar', (req, res) => {

    const id = req.body.id_atividade;
    if (!id) {
        return res.status(400).send('Como você deletará o arquivo se não configurou?');
    }
    const query = `DELETE FROM atividade  WHERE id_atividade = ${id}`;
    q(query)
        .then(results => {
            res.status(200).json(results);
        })
        .catch(err => {
            res.status(500).json({ error: 'Erro ao executar a consulta', details: err });
            console.log(err)
        });
});


module.exports = router;