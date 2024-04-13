const Router = require('express');
const router = Router();

const bd = require('../db/sql');

const { pool, query: q } = bd;

// -[X] RF 04 - Gerenciar mercado
// -[x] Ver
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
// -[x] Incluir
router.post('/mercado/incluir', (req, res) => {
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
router.post('/mercado/editar', (req, res) => {
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
router.post('/mercado/deletar', (req, res) => {
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

// -[X] RF 05 - Gerenciar Promotor
// -[X] Ver
router.get('/promotor/ver', (req, res) => {
    const query = "SELECT * FROM v_promotores;";

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
router.post('/promotor/incluir', (req, res) => {
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
router.post('/promotor/editar', (req, res) => {
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
router.post('/promotor/deletar', (req, res) => {

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
// -[X] RF 06 - Gerenciar Roteiro
// -[X] Ver
router.get('/roteiro/ver', (req, res) => {
    const query = "SELECT * FROM v_sup_vis;";

    q(query)
        .then(results => {
            res.status(200).json(results);
        })
        .catch(err => {
            res.status(500).json({ error: 'Erro ao executar a consulta', details: err });
        });
});
// -[X] Incluir
router.post('/roteiro/incluir', async (req, res) => {
    const { loja, endereco, cracha, visita: semana, ciclo, visita, tipo } = req.body;
    let connection;

    try {
        connection = await pool.promise().getConnection();
        await connection.beginTransaction();

        const [resultadoVisita] = await connection.query(
            'INSERT INTO db_visita (fk_loja, semana, ciclo, visita) SELECT id_loja, ?, ?, ? FROM db_loja WHERE loja = ? AND endereco = ?',
            [visita, ciclo, semana, loja, endereco]
        );

        const id_visita = resultadoVisita.insertId;

        await connection.query(
            'INSERT INTO db_roteiro (fk_visita, fk_usu) SELECT ?, id_usu FROM db_usuario WHERE cracha = ?',
            [id_visita, cracha]
        );

        await connection.commit();
        res.status(200).json({ mensagem: "Operação bem-sucedida!" });
    } catch (error) {
        if (connection) {
            await connection.rollback();
            console.error('Erro durante a transação:', error);
            res.status(500).json({ mensagem: "Falha na transação." });
        }
    } finally {
        if (connection) {
            connection.release();
        }
    }
});

// -[X] Editar
router.post('/roteiro/editar', async (req, res) => {
    const { cracha, visita, semana, ciclo, id_visita, loja, endereco } = req.body;
    console.log(req.body);
    let connection;

    try {
        connection = await pool.promise().getConnection();
        await connection.beginTransaction();

        // Atualizar os dados na tabela db_visita
        await connection.query(
            'UPDATE db_visita SET fk_loja = (select id_loja from db_loja where loja = ? AND endereco = ?), semana=?, ciclo=?, visita=? WHERE id_vis =?',
            [loja, endereco, visita, ciclo, semana, id_visita]
        );

        // Atualizar os dados na tabela db_roteiro
        await connection.query(
            'UPDATE db_roteiro SET fk_usu=(select id_usu from db_usuario where cracha = ?) WHERE fk_visita=?',
            [cracha, id_visita]
        );

        await connection.commit();
        res.status(200).json({ mensagem: "Operação de atualização bem-sucedida!" });
    } catch (error) {
        if (connection) {
            await connection.rollback();
            console.error('Erro durante a transação de atualização:', error);
            res.status(500).json({ mensagem: "Falha na transação de atualização." });
        }
    } finally {
        if (connection) {
            connection.release();
        }
    }
});
// -[X] Excluir
router.post('/roteiro/deletar', async (req, res) => {
    const { id_visita, id_roteiro } = req.body;
    let connection;

    try {
        connection = await pool.promise().getConnection();
        await connection.beginTransaction();

        // Excluir dados da tabela db_roteiro
        await connection.query(
            'DELETE FROM db_roteiro WHERE id_roteiro=?',
            [id_roteiro]
        );

        // Excluir dados da tabela db_visita
        await connection.query(
            'DELETE FROM db_visita WHERE id_vis=?',
            [id_visita]
        );

        await connection.commit();
        res.status(200).json({ mensagem: "Operação de exclusão bem-sucedida!" });
    } catch (error) {
        if (connection) {
            await connection.rollback();
            res.status(500).json({ mensagem: "Falha na transação de exclusão.", error });
        }
    } finally {
        if (connection) {
            connection.release();
        }
    }
});
// -[X] RF 07 - Horas trabalhadas
router.get('/pro/horas/ver', (req, res) => {
    const { id_usu, date1, date2 } = req.body;

    let query = "SELECT * FROM v_relogio";

    if (id_usu && date1 && date2) {
        query += ` WHERE id_usu = ${id_usu} AND data BETWEEN '${date1}' AND '${date2}'`;
    } else if (id_usu) {
        query += ` WHERE id_usu = ${id_usu}`;
    } else if (date1 && date2) {
        query += ` WHERE data BETWEEN '${date1}' AND '${date2}'`;
    }

    q(query)
        .then(results => {
            res.status(200).json(results);
        })
        .catch(err => {
            res.status(500).json({ error: 'Erro ao executar a consulta', details: err });
        });

});
// -[X] RF 08 - Supervisionar visitas
router.post('/pro/visitas/ver', (req, res) => {
    const { id_usu, date1, date2 } = req.body;

    let query = "SELECT * FROM v_sup";

    if (id_usu && date1 && date2) {
        query += ` WHERE fk_usu = ${id_usu} AND data BETWEEN '${date1}' AND '${date2}'`;
    }
    else if (date1 && date2) {
        query += ` WHERE data BETWEEN '${date1}' AND '${date2}'`;
    }
    else if (date1) {
        query += ` WHERE data '${date1}'`;
    }
    else if (id_usu) {
        query += ` WHERE fk_usu = ${id_usu}`;
    }

    q(query)
        .then(results => {
            res.status(200).json(results);
        })
        .catch(err => {
            res.status(500).json({ error: 'Erro ao executar a consulta', details: err });
        });

});

module.exports = router;



