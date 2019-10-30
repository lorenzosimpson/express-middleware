const userDb = require('./userDb');

function validateUser(req, res, next) {
    if (req.body) {
        if (!req.body.name) {
            res.status(400).json({ message: "missing required name field" })
        } 
    } 
    else {
        res.status(400).json({ message:  "missing user data"})
    }
    next();
}

module.exports = validateUser;