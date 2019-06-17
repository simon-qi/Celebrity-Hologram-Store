const { Pool, Client } = require('pg');
// database connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'password',
  port: 5432,
  connectionString: process.env.DATABASE_URL ? process.env.DATABASE_URL : null
});

module.exports = {
    authenticate,
    getAll,
    add,
    deleteUser,
    getUser,
    edit
};

function authenticate({ username, password }) {
    const query = {
      text: 'SELECT id, username, privilege FROM account WHERE username = $1 and password = $2;',
      values: [username, password],
    }

    return new Promise(function(resolve, reject) {
      pool.query(query)
        .then(dbres => {
          const user = dbres.rows[0];
          if (user) {
              resolve(user);
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

function getAll() {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT id, username, privilege FROM account;')
      .then(dbres => {
        const users = dbres.rows;
        resolve(users);
      })
      .catch(e => {
        console.error(e.stack);
        reject(e);
      });
  })
}

function add({ username, password, privilege }) {
    const query = {
      text: 'INSERT INTO account(username, password, privilege) VALUES($1, $2, $3)',
      values: [username, password, privilege],
    }

    return new Promise(function(resolve, reject) {
      pool.query(query)
        .then(dbres => {
          resolve();
        })
        .catch(e => {
          console.error(e.stack);
          reject(e);
        });
    })
}

function deleteUser(id) {
  const query = {
    text: 'DELETE FROM account where id = $1',
    values: [id],
  }

  return new Promise(function(resolve, reject) {
    pool.query(query)
      .then(dbres => {
        resolve();
      })
      .catch(e => {
        console.error(e.stack);
        reject(e);
      });
  })
}

function getUser(id) {
  const query = {
    text: 'SELECT id, username, privilege FROM account WHERE id = $1',
    values: [id],
  }

  return new Promise(function(resolve, reject) {
    pool.query(query)
      .then(dbres => {
        resolve(dbres.rows);
      })
      .catch(e => {
        console.error(e.stack);
        reject(e);
      });
  })
}

function edit(id, { username, password, privilege }) {
  const query = password ?
  {text: 'UPDATE account SET username = $1, password = $2, privilege = $3 WHERE id = $4',
   values: [username, password, privilege, id]} :
  {text: 'UPDATE account SET username = $1, privilege = $2 WHERE id = $3',
   values: [username, privilege, id]};


  return new Promise(function(resolve, reject) {
    pool.query(query)
      .then(dbres => {
        resolve();
      })
      .catch(e => {
        console.error(e.stack);
        reject(e);
      });
  })

}
