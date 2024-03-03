const Router = require('express');
const router = Router();

const bd = require('../db/sql');

const { query: q } = bd;

// -[X] RF 10 - Foto
router.post('/foto/incluir', (req, res) => {
    const { data, foto, fk_usu, fk_exe_tem } = req.body;
    const query = `INSERT INTO db_foto (data, foto, fk_usu, fk_exe_tem) VALUES ('${data}', '${foto}', ${fk_usu}, ${fk_exe_tem});`

    q(query)
        .then(results => {
            res.status(200).json(results);
        })
        .catch(err => {
            res.status(500).json({ error: 'Erro ao executar a consulta', details: err });
        });
});
// -[X] RF 11 - Atendimento de roteiro - não testado
router.post('/roteiro/ver', (req, res) => {
    const cracha = req.body.cracha;
    const query = `SELECT * FROM v_vis_pro where cracha = "${cracha}";`;

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
router.post('/justificativa/incluir', (req, res) => {
    const { data, foto, observacao, fk_usu, fk_exe_tem } = req.body;
    const query = `INSERT INTO db_foto (data, foto, observacao, fk_usu, fk_exe_tem) VALUES ('${data}', '${foto}', '${observacao}', ${fk_usu}, ${fk_exe_tem});`

    q(query)
        .then(results => {
            res.status(200).json(results);
        })
        .catch(err => {
            res.status(500).json({ error: 'Erro ao executar a consulta', details: err });
        });
});

module.exports = router;
