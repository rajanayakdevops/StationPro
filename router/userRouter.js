const express = require('express');
const userController = require("../controller/userController");

const userRouter = express.Router();

userRouter.get('/',userController.gethomepage);



userRouter.post('/showAvailTrains',userController.postShowTrainDetails);


exports.userRouter = userRouter;