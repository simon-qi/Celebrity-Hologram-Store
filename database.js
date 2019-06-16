const { Pool, Client } = require('pg')

// pools will use environment variables
// for connection information
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'password',
  port: 5432
})

pool.query('SELECT * FROM account;', (err, res) => {
  console.log(err, res)
  pool.end()
})
