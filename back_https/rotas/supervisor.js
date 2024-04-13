
const Mercado = require('./supervisor/mercado');
const Promotor = require('./supervisor/promotor');
const Roteiro = require('./supervisor/roteiro');
const Supervisionar = require('./supervisor/Supervisionar');
const Router = require('express');
const router = Router();



const bd = require('../db/sql');

const { pool, query: q } = bd;

// -[X] RF 04 - Gerenciar mercado
router.use('/mercado', Mercado);
  
// -[X] RF 05 - Gerenciar Promotor
router.use('/promotor', Promotor);

// -[X] RF 06 - Gerenciar Roteiro
router.use('/roteiro', Roteiro);

// -[X] RF 07 e 08 Supervisionar visitas e Roteiro
router.use('/pro', Supervisionar);

module.exports = router;



