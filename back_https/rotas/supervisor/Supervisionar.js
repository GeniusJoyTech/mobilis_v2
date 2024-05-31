const Router = require('express');

const router = Router();

const bd = require('../../db/sql');

const { pool, query: q } = bd;

// -[X] RF 08 - Supervisionar visitas
router.post('/visitas/ver', (req, res) => {
    const { id_usuario, id_loja, date1, date2, sendAtv: atividades } = req.body;
    let query = "SELECT f.* FROM foto f";
    if (id_usuario || id_loja || date1 || date2 || atividades.length > 0) {
        query = `SELECT s.datahora, s.id_atividade, a.id_agenda, a.id_usuario, l.id_loja, l.loja, l.rua, l.numero, f.foto, f.data, f.observacao, atv.descricao FROM servico s inner join agenda a on a.id_agenda = s.id_agenda INNER JOIN foto f on f.id_servico = s.id_servico INNER JOIN loja l on l.id_loja = a.id_loja INNER JOIN atividade atv on atv.id_atividade = s.id_atividade where`;
        if (id_usuario) {
            query += ` s.id_usuario = ${id_usuario}`;
        }
        if (atividades.length > 0) {
            checkQuery(query);
            query += ` s.id_atividade IN (${atividades})`;
        }
        if (id_loja) {
            checkQuery(query);
            query += ` l.id_loja = ${id_loja}`;
        }
        if (date1 && date2) {
            checkQuery(query);
            query += ` DATE(s.datahora) BETWEEN '${date1}' AND '${date2}'`;
        } else if (date1) {
            checkQuery(query);
            query += ` DATE(s.datahora) = '${date1}'`;
        } else if (date2) {
            checkQuery(query);
            query += ` DATE(s.datahora) = '${date2}'`;
        }
    }

    fq(query);

    function checkQuery(q) {
        if (q != `SELECT s.datahora, s.id_atividade, a.id_agenda, a.id_usuario, l.id_loja, l.loja, l.rua, l.numero, f.foto, f.data, f.observacao, atv.descricao FROM servico s inner join agenda a on a.id_agenda = s.id_agenda INNER JOIN foto f on f.id_servico = s.id_servico INNER JOIN loja l on l.id_loja = a.id_loja INNER JOIN atividade atv on atv.id_atividade = s.id_atividade where`) query += ' AND ';
    }
    function fq(query) {
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