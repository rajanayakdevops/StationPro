// external module

const express = require('express');
const app = express();

//core Module
const path = require('path');

//local module 
const rootDir = require("./utils/rootpath");
const {userRouter} = require("./router/userRouter");

app.use(express.urlencoded());
app.use(express.static(path.join(__dirname,'public')))




//setting ejs 
app.set('view engine','ejs');
app.set('views','views');



app.use("/user",userRouter);


// Error middleware
app.use((req,res,next)=>{
  res.send("<h1> Error 404 Page not found </h1>");
});



// server setup
const PORT = 3000;
app.listen(PORT,()=>{
  console.log(`Server Started at port ${PORT}`);
});

