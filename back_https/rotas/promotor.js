const Router = require('express');
const router = Router();

const bd = require('../db/sql');

const { query: q } = bd;

// -[X] RF 10 - Foto
router.post('/foto/incluir', (req, res) => {
    const { dia, foto, id_usu, loja, endereco, atividade } = req.body;
    const query = `INSERT INTO foto (data, foto, fk_usu, fk_exe_tem) VALUES ('${dia}', '${foto}', ${id_usu}, (select pk_exe from db_execucao_tem where fk_loja = (select id_loja from db_loja where endereco = '${endereco}' and loja = '${loja}') and fk_atividade = ${atividade}));`

    q(query)
        .then(results => {
            res.status(200).json(results);
        })
        .catch(err => {
            res.status(500).json({ error: 'Erro ao executar a consulta', details: err });
            
        });
});


router.post('/foto/incluir/teste', (req, res) => {
    const { dia, foto, id_usu, loja, endereco, atividade } = req.body;
    console.log(foto);
    console.log("teste");
});

// -[X] RF 11 - Atendimento de roteiro - não testado
router.post('/roteiro/ver', (req, res) => {
    const cracha = req.body.cracha;
    console.log(req);
    const query = `SELECT * FROM v_vis_pro where cracha = "${cracha}";`;
    console.log(query);
    q(query)
        .then(results => {
            res.status(200).json(results);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Erro ao executar a consulta', details: err });
        });
});
router.get('/roteiro/ver', (req, res) => {
    const query = `SELECT * FROM v_vis_pro;`;
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
