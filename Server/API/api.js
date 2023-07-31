const mysql = require('mysql2');

// MySQL Connection Pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Edri8980',
  database: 'project6_sql'
}).promise();

module.exports = {pool};
