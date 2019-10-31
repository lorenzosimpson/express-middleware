const express = require('express');
const userDb = require('./userDb');
const postDb = require('../posts/postDb');

const validateUser = require('./validateUser')
const validateUserId = require('./validateUserId')
const validatePost = require('../posts/validatePost')


const router = express.Router();

router.post('/', validateUser, (req, res) => {
    const newUser = req.body;
    userDb.insert(newUser)
    .then(resource => res.status(200).json(resource))
    .catch(err => res.status(500).json({ error: 'Failed to add new user'}))
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
    const id = Number(req.params.id);
    const newPost = req.body;
    userDb.getById(id)
    .then(user => {
       user ?  // user is found
        postDb.insert({...newPost, user_id: id})
        .then(addedPost => res.status(201).json(addedPost))
        .catch(err => res.status(500).json({ error: 'Could not add post'}))
       :
    res.status(404).json({ error: 'That user does not exist'})
    }) 
    
    .catch(err => res.status(500).json({ error: 'There was an error fetching the user'}))
});

router.get('/', (req, res) => {
    userDb.get()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({ error: 'Could not retrieve users'}))
});

router.get('/:id', validateUserId, (req, res) => {
    const id = Number(req.params.id)
    userDb.getById(id)
    .then(user => {
        res.status(200).json(user) 
    })
    .catch(err => res.status(500).json({ error: 'There was an error fetching the user'}))
});

router.get('/:id/posts', validateUserId, (req, res) => {
    const id = Number(req.params.id);
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
});

router.delete('/:id', validateUserId, (req, res) => {
    // delete a user by id
    const id = req.params.id;
    userDb.getById(id)
    .then(user => {
        user ?
        userDb.remove(id)
        .then(deleted => res.status(200).json(user))
        .catch(err => res.status(500).json({ error: 'Could not remove user'}))
        :
        res.status(404).json({ error: 'That user does not exist'})
    })
    .catch(err => res.status(500).json({ error: 'There was an error fetching the user'}))
});

router.put('/:id', validateUserId, (req, res) => {
    // edit a user by id
    const id = Number(req.params.id);
    const updatedUser = req.body;
    userDb.getById(id)
    .then(user => {
        user ? 
        userDb.update(id, updatedUser)
        .then(updated => {
            userDb.getById(id)
            .then(updatedUser => res.status(200).json(updatedUser))
        })
        .catch(err => res.status(500).json({ error: 'Could not update user'}))
        :
        res.status(404).json({ error: 'That user does not exist'})
    })
    .catch(err => res.status(500).json({ error: 'There was an error fetching the user' }))

});







module.exports = router;
