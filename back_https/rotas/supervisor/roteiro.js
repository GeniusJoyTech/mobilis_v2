const Router = require('express');

const router = Router();

const bd = require('../../db/sql');

const { pool, query: q } = bd;

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

module.exports = router;