const Router = require('express');
const router = Router();

const bd = require('../db/sql');

const { pool, query: q } = bd;

// -[X] RF 04 - Gerenciar mercado
// -[x] Ver
router.get('/mercado/ver', (req, res) => {
    const query = "SELECT * FROM db_loja;";

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
    const { nome, endereco } = req.body;
    const query = `INSERT INTO db_loja (id_loja, nome, endereco) VALUES (NULL, '${nome}', '${endereco}');`

    q(query)
        .then(results => {
            res.status(200).json(results);
        })
        .catch(err => {
            res.status(500).json({ error: 'Erro ao executar a consulta', details: err });
        });
})
// -[x] Editar
router.post('/mercado/editar', (req, res) => {
    const { nome, endereco, id_loja } = req.body;
    if (!id_loja) {
        return res.status(400).send('O campo id_loja é obrigatório');
    }

    const query = `UPDATE db_loja SET nome = '${nome}', endereco = '${endereco}' WHERE id_loja = ${id_loja}`;

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
    const query = `DELETE FROM db_loja  WHERE id_loja = ${id_loja}`;
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
router.post('/promotor/incluir', (req, res) => {
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
router.post('/promotor/editar', (req, res) => {
    const { nome, cracha, superior, endereco, email, id } = req.body;

    // Verifique se o id está presente nos parâmetros da solicitação
    if (!id) {
        return res.status(400).send('O campo id é obrigatório');
    }

    const query = `UPDATE db_usuario SET nome = '${nome}', cracha = '${cracha}', superior = '${superior}', endereco = '${endereco}', email = '${email}' WHERE id_usu = ${id}`;

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
router.post('/promotor/deletar', (req, res) => {
    const id = req.body.id;
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
    const { fk_loja, fk_usu, semana, ciclo, visita, tipo } = req.body;
    let connection;

    try {
        connection = await pool.promise().getConnection();
        await connection.beginTransaction();

        const [resultadoVisita] = await connection.query(
            'INSERT INTO db_visita (fk_loja, semana, ciclo, visita) VALUES (?, ?, ?, ?)',
            [fk_loja, semana, ciclo, visita]
        );

        const id_visita = resultadoVisita.insertId;

        await connection.query(
            'INSERT INTO db_roteiro (tipo, fk_visita, fk_usu) VALUES (?, ?, ?)',
            [tipo, id_visita, fk_usu]
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
    const { fk_loja, fk_usu, semana, ciclo, visita, tipo, id_visita } = req.body;
    let connection;

    try {
        connection = await pool.promise().getConnection();
        await connection.beginTransaction();

        // Atualizar os dados na tabela db_visita
        await connection.query(
            'UPDATE db_visita SET fk_loja=?, semana=?, ciclo=?, visita=? WHERE id_vis =?',
            [fk_loja, semana, ciclo, visita, id_visita]
        );

        // Atualizar os dados na tabela db_roteiro
        await connection.query(
            'UPDATE db_roteiro SET tipo=?, fk_usu=? WHERE fk_visita=?',
            [tipo, fk_usu, id_visita]
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
router.get('/pro/visitas/ver', (req, res) => {
    const { id_usu, date1, date2 } = req.body;

    let query = "SELECT * FROM v_sup";

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

module.exports = router;