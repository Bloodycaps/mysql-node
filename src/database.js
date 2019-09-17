const mysql = require('mysql');
const { promisify } = require('util');
const { database } = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if (err){
        if (err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('CONECCION CON LA BASE DE DATOS CERRADA');
        }
        if (err.code === 'ER_CON_COUNT_ERROR'){
            console.error('LA BASE DE DATOS TIENE DEMASIADAS CONECCIONES');
        }
        if (err.code === 'ECONNREFUSED'){
            console.error('CONECCION A BASE DE DATOS RECHAZADA');
        }
    }

    if (connection) connection.release();
    console.log('DB en linea');
    return;
});

pool.query = promisify(pool.query);

module.exports = pool;