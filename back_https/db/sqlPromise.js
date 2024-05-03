const mysql = require('mysql2');
const { promisify } = require('util');

const pool = mysql.createPool({
    host: 'srv1074.hstgr.io',
    user: 'u874236547_Gabriel',
    password: 'P0r69r90',
    database: 'u874236547_kadi',
    port: '3306',
    connectionLimit: 10
});

const beginTransaction = async () => {
    const connection = await promisify(pool.getConnection).call(pool);
    await promisify(connection.beginTransaction).call(connection);
    return connection;
};

const commitTransaction = async (connection) => {
    await promisify(connection.commit).call(connection);
    connection.release();
};

const rollbackTransaction = async (connection) => {
    await promisify(connection.rollback).call(connection);
    connection.release();
};

const query = async (sql, values, connection) => {
    try {
        if (!connection) {
            connection = await beginTransaction();
        }

        const result = await promisify(connection.query).call(connection, sql, values);
        return result;
    } catch (error) {
        //console.log(error);
        throw error;
    }
};

module.exports = { pool, query, beginTransaction, commitTransaction, rollbackTransaction };
