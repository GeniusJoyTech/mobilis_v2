// Obtém o cliente
const mysql = require('mysql2');
const { promisify } = require('util');

const pool = mysql.createPool({
    host: 'srv1074.hstgr.io',
    user: 'u874236547_Genius',
    password: 'P0r69r90',
    database: 'u874236547_Mobilis',
    port: '3306', // Porta padrão do MySQL
    connectionLimit: 10 // Número máximo de conexões na pool
});

const query = async (sql, values) => {
    const getConnection = promisify(pool.getConnection).bind(pool);
    const query = promisify(pool.query).bind(pool);

    let connection;

    try {
        connection = await getConnection();
        const results = await query(sql, values);
        return results;
    } catch (err) {
        throw err;
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

module.exports = {pool, query};
