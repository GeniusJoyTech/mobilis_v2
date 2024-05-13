const Router = require('express');
const router = Router();
const bd = require('../db/sql');


const jwt = require("jsonwebtoken");
const { query: q } = bd;

const { query, beginTransaction, commitTransaction, rollbackTransaction } = require('../db/sqlPromise');



// -[X] RF 10 - Foto
router.post('/foto/incluir', async (req, res) => {
    const token = req.header('Authorization');
    const decoded = jwt.verify(token, 'segredo');
    const id_usuario = decoded.id_usuario;
    try {
        const { id_agenda, id_atividade, observacao, foto, datahora } = req.body;

        // Inicia uma transação
        let connection;
        try {
            connection = await beginTransaction();

            // Primeira inserção na tabela `servico`
            const results1 = await query("INSERT INTO `servico` (`id_usuario`, `id_agenda`, `id_atividade`, `datahora`) VALUES (?, ?, ?, ?)", [id_usuario, id_agenda, id_atividade, datahora], connection);

            // Segunda inserção na tabela `foto`
            const results2 = await query("INSERT INTO `foto` (`id_servico`, `observacao`, `foto`, `data`) VALUES (?, ?, ?, current_timestamp())", [results1.insertId, observacao, foto], connection);

            // Comita a transação
            await commitTransaction(connection);

            res.status(200).send({message: 'Inserções concluídas com sucesso.'});
        } catch (error) {
            // Reverte a transação em caso de erro
            if (connection) {
                await rollbackTransaction(connection);
            }
            console.error('Erro ao inserir dados:', error);
            res.status(500).send('Erro ao inserir dados.');
        }
    } catch (error) {
        console.error('Erro ao inserir dados:', error);
        res.status(500).send('Erro ao inserir dados.');
    }
});


router.post('/foto/incluir/teste', (req, res) => {
    const { dia, foto, id_usu, loja, endereco, atividade } = req.body;
    console.log(foto);
    console.log("teste");
});

// -[X] RF 11 - Atendimento de roteiro
router.post('/roteiro/ver', (req, res) => {
    const { date } = req.body
    const token = req.header('Authorization');
    const decoded = jwt.verify(token, 'segredo');
    const id_usuario = decoded.id_usuario;
    const query = `
    SELECT * FROM v_visitas where 
    (ciclo <> 0 and id_usuario = ${id_usuario} and
        DATEDIFF('${date}', diavisita) % (ciclo * 7) = 0
            or
        '${date}' = diavisita and id_usuario = ${id_usuario});
    `;
    q(query)
        .then(results => {
            res.status(200).json(results);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Erro ao executar a consulta', details: err });
        });
});

// -[X] RF 12 - Início de visita - feito em foto
// -[X] RF 13 - Final de visita - feito em foto
// -[X] RF 14 - Justificar Falta
router.post('/justificativa/incluir', async (req, res) => {
    try {
        const token = req.header('Authorization');
        const decoded = jwt.verify(token, 'segredo');
        const id_usuario = decoded.id_usuario;
        const { observacao, foto, datahora, id_loja } = req.body;
        let id_agenda = 0;
        const qry = `SELECT id_agenda FROM agenda where id_loja = ${id_loja} and id_usuario = ${id_usuario};`;
        await q(qry)
            .then(results => {
                id_agenda = results[0].id_agenda;

                if (id_agenda == 0) {
                    res.status(404).send('Verifique suas as informações enviadas.');
                    return;
                }
                return;
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: 'Erro ao executar a consulta', details: err });
                return;
            });

        // Inicia uma transação
        let connection;
        try {
            connection = await beginTransaction();

            // Primeira inserção na tabela `servico`
            const results1 = await query("INSERT INTO `servico` (`id_usuario`, `id_agenda`, `datahora`) VALUES (?, ?, ?)", [id_usuario, id_agenda, datahora], connection);

            // Segunda inserção na tabela `foto`
            const results2 = await query("INSERT INTO `foto` (`id_servico`, `observacao`, `foto`, `data`) VALUES (?, ?, ?, ?)", [results1.insertId, observacao, foto, datahora], connection);

            // Comita a transação
            await commitTransaction(connection);

            res.status(200).send({ message: 'Inserções concluídas com sucesso.' });

        } catch (error) {
            // Reverte a transação em caso de erro
            if (connection) {
                await rollbackTransaction(connection);
            }
            console.error('Erro ao inserir dados:', error);
            res.status(500).send('Erro ao inserir dados.');
        }
    } catch (error) {
        console.error('Erro ao inserir dados:', error);
        res.status(500).send('Erro ao inserir dados.');
    }
});

module.exports = router;
