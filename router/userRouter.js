const express = require('express');

const userRouter = express.Router();

userRouter.get('/',(req,res)=>{
  res.send(`<h1> welcome to home page </h1>`);
});


exports.userRouter = userRouter;