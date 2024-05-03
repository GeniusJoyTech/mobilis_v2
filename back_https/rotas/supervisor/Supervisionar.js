const Router = require('express');

const router = Router();

const bd = require('../../db/sql');

const { pool, query: q } = bd;


// -[X] RF 07 - Horas trabalhadas
router.get('/horas/ver', (req, res) => {
    const { id_usuario, date1, date2 } = req.body;

    let query = "SELECT * FROM v_relogio";

    if (id_usuario && date1 && date2) {
        query += ` WHERE id_usuario = ${id_usuario} AND data BETWEEN '${date1}' AND '${date2}'`;
    } else if (id_usuario) {
        query += ` WHERE id_usuario = ${id_usuario}`;
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
    const { id_usuario, date1, date2 } = req.body;
    let query = "SELECT * FROM v_sup";

    if (id_usuario && date1 && date2) {
        query += ` WHERE id_usuario = ${id_usuario} AND data BETWEEN '${date1} 00:00:00' AND '${date2} 23:59:59'`;
        console.log('0');
        fq(query);
    }
    else if (date1 && date2) {
        console.log('1');
        query += ` WHERE data BETWEEN '${date1}' AND '${date2}'`;
        fq(query);
    }
    else if (date1) {
        console.log('2');
        query += ` WHERE data >= '${date1} 00:00:00' AND data <= '${date1} 23:59:59'`;
        fq(query);
    }
    else if (id_usuario) {
        
        console.log('3');
        query += ` WHERE id_usuario = ${id_usuario}`;
        fq(query);
    }
function fq(query){
    console.log(query);
    q(query)
    .then(results => {
        res.status(200).json(results);
    })
    .catch(err => {
        res.status(500).json({ error: 'Erro ao executar a consulta', details: err });
    });

}
});

module.exports = router;