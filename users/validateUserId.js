const userDb = require('./userDb');

function validateUserId(req, res, next) {
    userDb.getById(req.params.id)
    .then(user => {
        if (user) {
            user = req.user
            next();
        }
        else {
            res.status(400).json({ message: "invalid user id" })
        }
    })
    .catch(err => console.log(err))
};

module.exports = validateUserId;