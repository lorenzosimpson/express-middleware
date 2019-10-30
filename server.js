const express = require('express');
const userRouter = require('./users/userRouter.js');
const postRouter = require('./posts/postRouter')
const server = express();


server.use('api/', logger)
server.use(express.json())

server.get('api/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

server.use('/api/users', userRouter)
server.use('/api/posts', postRouter)

//custom middleware

function logger(req, res, next) {
  console.log(`Method: ${req.method}, URL: ${req.url}, ${new Date()}`);
  next();
};




module.exports = server;
