const express = require('express');
const userRouter = require('./users/userRouter.js');
const postRouter = require('./posts/postRouter');



const server = express();



server.use(express.json())
server.use('/api', logger)
server.use('/api/users', userRouter)
server.use('/api/posts', postRouter)

server.get('/api', (req, res) => {
  res.send(`<h2>Welcome to API! Navigate to /users to see users</h2>`)
});


function logger(req, res, next) {
  console.log(`Method: ${req.method}, URL: ${req.url}, ${new Date()}`);
  next();
};



module.exports = server;
