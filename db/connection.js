const mysql = require('mysql2/promise');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'JL_SQL',
    database: 'employee_tracker'
});

module.exports = connection;