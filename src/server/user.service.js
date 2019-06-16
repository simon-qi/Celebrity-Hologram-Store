const users = [{ id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' }];
const { Pool, Client } = require('pg');
// database connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'password',
  port: 5432
});

module.exports = {
    authenticate,
    getAll
};

function authenticate({ username, password }) {
    const query = {
      text: 'SELECT * FROM account WHERE username = $1 and password = $2;',
      values: [username, password],
    }

    return new Promise(function(resolve, reject) {
      pool.query(query)
        .then(dbres => {
          const user = dbres.rows[0];
          if (user) {
              const { password, ...userWithoutPassword } = user;
              resolve(userWithoutPassword);
          } else {
              resolve();
          }
        })
        .catch(e => {
          console.error(e.stack);
          reject(e);
        });
    })


}

async function getAll() {
    return users.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
}
