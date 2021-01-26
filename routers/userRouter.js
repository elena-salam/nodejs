const express = require('express');
const userRouter = express.Router();
// const {asyncWrapper} = require('./helper.js')
const { getCurrentUser, updateUser } = require('../Controllers/userController.js');
const authMiddleware = require('./authMiddleware.js');

userRouter.use(authMiddleware);
userRouter.get('/current', getCurrentUser);
// userRouter.patch('/', updateUser);


module.exports = userRouter;