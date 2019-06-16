const pg = require(‘pg’);
const pool = new pg.Pool({
user: ‘postgres’,
host: ‘localhost’,
database: ‘postgres’’,
password: ‘password’,
port: ‘5432’});

pool.query(“SELECT NOW()”, (err, res) => {
console.log(err, res);
pool.end();
});
