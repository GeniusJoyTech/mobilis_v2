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



// -[X] RF 11 - Atendimento de roteiro
router.post('/roteiro/pendentes', (req, res) => {
    const { date } = req.body
    const token = req.header('Authorization');
    const decoded = jwt.verify(token, 'segredo');
    const id_usuario = decoded.id_usuario;
    const query = `
    SELECT * 
    FROM v_visitas v
    WHERE 
        ((v.ciclo <> 0 or v.ciclo = 0 and '${date}' = v.diavisita) 
        AND 
        (    DATEDIFF('${date}', v.diavisita) % (v.ciclo * 7) = 0 
            OR '${date}' = v.diavisita
        ) 
        AND v.id_usuario = ${id_usuario} 
        )AND not EXISTS (
            SELECT 1 
            FROM servico s 
            WHERE s.id_agenda = v.id_agenda
        ) ;

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

router.post('/roteiro/andamento', (req, res) => {
    const { date } = req.body;
    const token = req.header('Authorization');
    const decoded = jwt.verify(token, 'segredo');
    const id_usuario = decoded.id_usuario;
    const query = `
        
        
    select * from v_visitas where id_agenda = 
    (
        SELECT distinct entrada.id_agenda from servico entrada 
    where entrada.id_usuario = ${id_usuario} 
    and date(entrada.datahora) = '${date}'
    and entrada.id_agenda not in(
                SELECT saida.id_agenda
                from servico saida
                where saida.id_atividade = 2 
                and saida.id_usuario = entrada.id_usuario
                AND date(entrada.datahora) = date(saida.datahora)     
    )
    )
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

router.post('/roteiro/concluida', (req, res) => {
    const { date } = req.body
    const token = req.header('Authorization');
    const decoded = jwt.verify(token, 'segredo');
    const id_usuario = decoded.id_usuario;
    const query = `
    SELECT *
        FROM v_visitas
        WHERE id_agenda IN 
        (
            SELECT DISTINCT id_agenda
            FROM servico
            WHERE id_atividade = 2 
            AND date(datahora) = '${date}'
        )
        and id_usuario = ${id_usuario}
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

router.get('/roteiro/atividades', (req, res) => {
    const query = `
        SELECT * FROM atividade WHERE id_atividade > 1
        and (tipo = 'Promotor' or tipo = 'Usuario');
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
    //const { datahora, foto, id_loja } = req.body
    const token = req.header('Authorization');
    const decoded = jwt.verify(token, 'segredo');
    const id_usuario = decoded.id_usuario;
    try {
        const { id_agenda, id_atividade, observacao, foto, datahora } = req.body;
        const date = datahora.split('T')[0];
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

// log das atividades feitas pelo promotor durante o dia
router.post('/log', (req, res) => {
    const { date } = req.body
    const token = req.header('Authorization');
    const decoded = jwt.verify(token, 'segredo');
    const id_usuario = decoded.id_usuario;
    const query = `SELECT * FROM v_log_promotor WHERE id_usuario = ${id_usuario} and date(datahora) ='${date}'`;

    q(query)
        .then(results => {
            res.status(200).json(results);
        })
        .catch(err => {
            res.status(500).json({ error: 'Erro ao executar a consulta', details: err });
        });
});

// Foto das atividades feitas pelo promotor durante o dia, selecionadas pelo log
router.post('/log/foto', (req, res) => {
    const { id_agenda } = req.body;
    const query = `SELECT * FROM foto WHERE id_servico = ${id_agenda}`;
    console.log(query);
    q(query)
        .then(results => {
            res.status(200).json(results);
        })
        .catch(err => {
            res.status(500).json({ error: 'Erro ao executar a consulta', details: err });
        });
});

//Adicionar Lojas
//Ver Lojas
router.get('/mercado/ver', (req, res) => {
    const query = "SELECT * FROM loja;";

    q(query)
        .then(results => {
            res.status(200).json(results);
        })
        .catch(err => {
            res.status(500).json({ error: 'Erro ao executar a consulta', details: err });
        });
});
//Adicionar Loja
router.post('/mercado/incluir', (req, res) => {
    const { id_loja, diavisita } = req.body;
    const token = req.header('Authorization');
    const decoded = jwt.verify(token, 'segredo');
    const id_usuario = decoded.id_usuario;
    const query = `
    
    INSERT INTO agenda (id_agenda, id_loja, ciclo, diavisita, id_usuario, id_criador) 
    VALUES (NULL, ${id_loja}, 0, '${diavisita}', '${id_usuario}', '${id_usuario}');

    `
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

module.exports = router;
