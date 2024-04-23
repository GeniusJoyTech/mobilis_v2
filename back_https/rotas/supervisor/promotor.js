const Router = require('express');

const router = Router();

const bd = require('../../db/sql');

const { pool, query: q } = bd;

// -[X] Ver
router.get('/ver', (req, res) => {
    const query = "SELECT nome, status, cargo, id_usuario, id_superior, superior cep, cidade rua, numero, cracha, email FROM v_promotores;";

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
router.post('/incluir', (req, res) => {
    const { nome, cracha, id_superior, cep, numero, rua, cidade, email } = req.body;
    const query = `INSERT INTO usuario (nome, cargo, cracha, id_superior, cep, numero, rua, cidade, email, senha)
            VALUES ('${nome}', 'Promotor', '${cracha}', '${id_superior}', '${cep}', ${numero}, '${rua}', '${cidade}', '${email}', '123456');`

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
    const { nome, cracha, superior, cep, numero, rua, cidade, email, id_usuario, id_superior } = req.body;
    const token = req;
    // Verifique se o id está presente nos parâmetros da solicitação
    if (!id_usuario) {
        return res.status(400).send('O campo id é obrigatório');
    }

    const query = `UPDATE usuario 
                    SET nome = '${nome}', cep = '${cep}', cidade = '${cidade}',
                        rua = '${rua}', numero = ${numero}, cracha = '${cracha}',
                        id_superior = ${id_superior}, email = '${email}'
                    WHERE id_usuario = ${id_usuario}`;

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