const Router = require('express');

const router = Router();

const bd = require('../../db/sql');

const { pool, query: q } = bd;

// -[x] Ver
router.get('/ver', (req, res) => {
    const query = "SELECT * FROM loja;";

    q(query)
        .then(results => {
            res.status(200).json(results);
        })
        .catch(err => {
            res.status(500).json({ error: 'Erro ao executar a consulta', details: err });
        });
});
// -[x] Incluir
router.post('/incluir', (req, res) => {
    const { loja, cep, numero, rua, cidade, celular } = req.body;

    const query = `INSERT INTO loja
             (loja, rua, cidade, numero, cep, celular) VALUES 
             ('${loja}', '${rua}', '${cidade}', ${numero}, '${cep}', '${celular}');`
    console.log(query);
    q(query)
        .then(results => {
            res.status(200).json(results);
        })
        .catch(err => {
            res.status(500).json({ error: 'Erro ao executar a consulta', details: err });
            console.log(err);
        });
})
// -[x] Editar
router.post('/editar', (req, res) => {
    const { loja, cep, numero, rua, cidade, celular, id_loja } = req.body;
    if (!id_loja) {
        return res.status(400).send('O campo id_loja é obrigatório');
    }

    const query = `UPDATE loja SET loja = '${loja}',  rua = '${rua}', cidade='${cidade}', numero='${numero}', cep='${cep}', celular='${celular}' WHERE id_loja = ${id_loja}`;

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
router.post('/deletar', (req, res) => {
    const id_loja = req.body.id_loja;
    if (!id_loja) {
        return res.status(400).send('O campo id é obrigatório');
    }
    const query = `DELETE FROM loja  WHERE id_loja = ${id_loja}`;
    q(query)
        .then(results => {
            res.status(200).json(results);
        })
        .catch(err => {
            res.status(500).json({ error: 'Erro ao executar a consulta', details: err });
        });
});
module.exports = router;