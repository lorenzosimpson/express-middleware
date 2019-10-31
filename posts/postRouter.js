const express = require('express');
const postDb = require('./postDb');


const router = express.Router();

router.get('/', (req, res) => {
    postDb.get()
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(500).json({ error: 'Could not retrieve posts'}))
});

router.get('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

// custom middleware



module.exports = router;