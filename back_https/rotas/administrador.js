const Router = require('express');
const router = Router();

const bd = require('../db/sql');

const jwt = require("jsonwebtoken");

const { query: q } = bd;
const { query, beginTransaction, commitTransaction, rollbackTransaction } = require('../db/sqlPromise');

// -[X] RF 09 - Gerenciar usuário
// -[X] Ver
router.get('/func/ver', (req, res) => {
    
    const token = req.header('Authorization');
    const decoded = jwt.verify(token, 'segredo');
    const administrador = decoded.id_usuario;

    const query = `SELECT * FROM v_usuario_admin where id_usuario <> ${administrador};`;

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
            res.status(500).json({ error: 'Erro ao executar a consulta', details: err })
            console.log(err);
        });
});
// -[X] Incluir
router.post('/func/incluir', (req, res) => {

    const { id_superior, nome, cracha, cep, numero, rua, cargo, cidade, email } = req.body;
    const token = req.header('Authorization');
    const decoded = jwt.verify(token, 'segredo');
    const administrador = decoded.id_usuario;

    const superior = id_superior ? id_superior : administrador;
    const query = `INSERT INTO usuario
                    (id_superior, status, nome, cracha, cep, numero, rua, cargo, cidade, email, senha)
                    VALUES 
                    (
                        ${superior}, 
                        'Ativo', 
                        '${nome}', 
                        '${cracha}', 
                        '${cep}', ${numero}, 
                        '${rua}', 
                        '${cargo}', 
                        '${cidade}', 
                        '${email}', 
                        '123456'
                    );`

    q(query)
        .then(results => {
            res.status(200).json(results);
        })
        .catch(err => {
            res.status(500).json({ error: 'Erro ao executar a consulta', details: err });
            console.log(err);
        });
})
// -[X] Editar
router.post('/func/editar', (req, res) => {
    const { nome, cargo, cracha, id_superior, cep, numero, rua, cidade, email, id_usuario } = req.body;

    // Verifique se o id está presente nos parâmetros da solicitação
    if (!id_usuario) {
        return res.status(400).send('O campo id é obrigatório');
    }

    const query = `UPDATE usuario SET nome = '${nome}', cargo = '${cargo}', cracha = '${cracha}', cep = '${cep}', numero = '${numero}', rua = '${rua}', cidade = '${cidade}', id_superior = '${id_superior}', email = '${email}' WHERE id_usuario = ${id_usuario}`;

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

router.post('/func/alterarstatus', (req, res) => {
    const { status, id_usuario } = req.body;

    // Verifique se o id está presente nos parâmetros da solicitação
    if (!id_usuario) {
        return res.status(400).send('O campo id é obrigatório');
    }

    const query = `UPDATE usuario SET status = '${status}' WHERE id_usuario = ${id_usuario}`;
    console.log(query);
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
// router.post('/func/deletar', (req, res) => {
//     const id = req.body.id_usuario;
    
//     if (!id) {
//         return res.status(400).send('O campo id é obrigatório');
//     }
//     const query = `DELETE FROM usuario  WHERE id_usuario = ${id}`;
//     q(query)
//         .then(results => {
//             res.status(200).json(results);
//         })
//         .catch(err => {
//             res.status(500).json({ error: 'Erro ao executar a consulta', details: err });
//         });
// });


// -[X] Excluir
router.post('/func/deletar', async (req, res) => {
    const { id_usuario } = req.body;
    const token = req.header('Authorization');
    const decoded = jwt.verify(token, 'segredo');
    const administrador = decoded.id_usuario;

    if (!id_usuario) {
        return res.status(400).send('O campo id é obrigatório.');
    }

    let connection;
    try {
        connection = await beginTransaction();

        // Atualiza o id_superior dos usuários que têm o id do usuário a ser excluído como seu id_superior
        await query("UPDATE usuario SET id_superior = ? WHERE id_superior = ?", [administrador, id_usuario], connection);

        // Atualiza o id_criador na tabela agenda
        await query("UPDATE agenda SET id_criador = ? WHERE id_criador = ?", [administrador, id_usuario], connection);

        // Exclui todas as fotos associadas aos serviços do usuário
        await query("DELETE FROM foto WHERE id_servico IN (SELECT id_servico FROM servico WHERE id_usuario = ?)", [id_usuario], connection);

        // Exclui todos os serviços do usuário
        await query("DELETE FROM servico WHERE id_usuario = ?", [id_usuario], connection);

        // Exclui todas as agendas do usuário
        await query("DELETE FROM agenda WHERE id_usuario = ?", [id_usuario], connection);

        // Exclui o usuário
        await query("DELETE FROM usuario WHERE id_usuario = ?", [id_usuario], connection);

        await commitTransaction(connection);
        res.status(200).send({ message: 'Usuário excluído com sucesso.' });
    } catch (error) {
        if (connection) {
            await rollbackTransaction(connection);
        }
        console.error('Erro ao excluir usuário:', error);
        res.status(500).send('Erro ao excluir usuário.');
    }
});





module.exports = router;
