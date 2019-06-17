const express = require('express');
const bodyParser = require('body-parser');
const { Pool, Client } = require('pg')
const basicAuth = require('./basic-auth');
const errorHandler = require('./error-handler');
const favicon = require('express-favicon');
const path = require('path');

const app = express();
app.use(express.json({type: '*/*'}));
app.use(favicon(path.join(__dirname, '../../build', 'favicon.ico')));
app.use('/users', require('./users.controller'));
app.use(basicAuth);
app.use(errorHandler);

// database connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'password',
  port: 5432,
  connectionString: process.env.DATABASE_URL ? process.env.DATABASE_URL : null
})

app.get('/api/list', (req, res) => {
  const query = 'select * from celebrity;';

  pool.query(query)
    .then(dbres => res.send(dbres.rows))
    .catch(e => {
      console.error(e.stack);
      res.sentStatus(400);
    });
});

app.get('/api/get', (req, res) => {
  const query = {
    text: 'SELECT * FROM celebrity WHERE id = $1',
    values: [req.query.id],
  }

  pool.query(query)
    .then(dbres => res.send(dbres.rows))
    .catch(e => {
      console.error(e.stack);
      res.sentStatus(400);
    });
});

app.put('/api/edit', (req, res) => {
  const query = {
    text: 'UPDATE celebrity SET name=$1, age=$2, occupation=$3, price=$4 WHERE id=$5',
    values: [req.body.name, req.body.age, req.body.occupation, req.body.price, req.query.id],
  }

  pool.query(query)
    .then(res => console.log(res.rows[0]))
    .catch(e => console.error(e.stack));

  res.setHeader('Content-Type', 'application/json');
  res.sendStatus(200);
});


app.post('/api/add', (req, res) => {
  const query = {
    text: 'INSERT INTO celebrity(name, age, occupation, price) VALUES($1, $2, $3, $4)',
    values: [req.body.name, req.body.age, req.body.occupation, req.body.price],
  }

  pool.query(query)
    .then(res => console.log(res.rows[0]))
    .catch(e => console.error(e.stack));

  res.setHeader('Content-Type', 'application/json');
  res.sendStatus(200);
});

app.delete('/api/delete', (req, res) => {
  const query = {
    text: 'DELETE FROM celebrity WHERE id = $1',
    values: [req.query.id],
  }

  pool.query(query)
    .then(res => console.log(res.rows[0]))
    .catch(e => console.error(e.stack));

  res.setHeader('Content-Type', 'application/json');
  res.sendStatus(200);
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../../build')));
// Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../../build', 'index.html'));
  });
}

app.listen(process.env.PORT || 3001, () =>
  console.log('Express server is running on localhost:3001')
);
