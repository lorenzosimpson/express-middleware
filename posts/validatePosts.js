const postDb = require('./postDb');

function validatePost(req, res, next) {
    if (req.method === 'POST' || req.method === 'PUT') {
        if (!req.body) {
            res.status(400).json({ message: "missing post data" })
        }
        else if (!req.body.text) {
            res.status(400).json({ message: 'missing required text field'})
        }
    } next();
}

module.exports = validatePost;