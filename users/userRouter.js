const express = require('express');
const userDb = require('./userDb');

const router = express.Router();

router.post('/', (req, res) => {
    const newUser = req.body;

    newUser.name ?
    userDb.insert(newUser)
    .then(resource => res.status(200).json(resource))
    .catch(err => res.status(500).json({ error: 'Failed to add new user'}))
    :
    res.status(400).json({ error: 'Please include a name'})
});

router.post('/:id/posts', (req, res) => {

});

router.get('/', (req, res) => {
    userDb.get()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({ error: 'Could not retrieve users'}))
});

router.get('/:id', (req, res) => {

});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
