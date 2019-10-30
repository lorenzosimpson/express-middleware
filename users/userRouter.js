const express = require('express');
const userDb = require('./userDb');
const postDb = require('../posts/postDb');

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
    const id = Number(req.params.id)
    id ?
    userDb.getById(id)
    .then(user => {
        user ? res.status(200).json(user) : res.status(404).json({ error: 'That user does not exist'})
    })
    .catch(err => res.status(500).json({ error: 'There was an error fetching the user'}))
    :
    res.status(400).json({ error: 'Please include a valid id'})
});

router.get('/:id/posts', (req, res) => {
    const id = Number(req.params.id);
    id ?
    userDb.getById(id)
    .then(user => {
        user ?
        // loop in posts db
        postDb.get()
        .then(posts => {
            const userPosts = posts.filter(post => post.user_id === id)
            userPosts.length ?
            res.status(200).json(userPosts)
            :
            res.status(404).json({ error: 'That user has no posts'})
        })
        .catch(err => res.status(500).json({ error: 'Could not retrieve posts'}))
        :
        res.status(404).json({ error: 'That user does not exist'})
        // user doesn't exist
    })
    .catch(err => res.status(500).json({ error: 'There was an error fetching the user\'s posts'}))
    :
    res.status(400).json({ error: 'Please include a valid id'})
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
