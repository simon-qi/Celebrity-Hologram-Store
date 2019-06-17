const express = require('express');
const router = express.Router();
const userService = require('./user.service');

// routes
router.post('/authenticate', authenticate);
router.get('/list', getAll);
router.post('/add', add);
router.delete('/delete', deleteUser)
router.get('/get', getUser);
router.put('/edit', edit);

module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function add(req, res, next) {
    userService.add(req.body)
        .then(() => res.sendStatus(200))
        .catch(err => next(err));
}

function deleteUser(req, res, next) {
    userService.deleteUser(req.query.id)
        .then(() => res.sendStatus(200))
        .catch(err => next(err));
}

function getUser(req, res, next) {
    userService.getUser(req.query.id)
        .then(user => res.send(user))
        .catch(err => next(err));
}

function edit(req, res, next) {
    userService.edit(req.query.id, req.body)
        .then(() => res.sendStatus(200))
        .catch(err => next(err));
}
