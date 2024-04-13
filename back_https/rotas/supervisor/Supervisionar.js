const Router = require('express');

const router = Router();

const bd = require('../../db/sql');

const { pool, query: q } = bd;


// -[X] RF 07 - Horas trabalhadas
router.get('/horas/ver', (req, res) => {
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
router.post('/visitas/ver', (req, res) => {
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