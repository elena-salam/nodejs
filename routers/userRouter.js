const express = require('express');
const userRouter = express.Router();
// const {asyncWrapper} = require('./helper.js')
const { getCurrentUser } = require('../Controllers/userController.js');
const authMiddleware = require('./authMiddleware.js');


userRouter.get('/current', authMiddleware, getCurrentUser); //проверяем валидный ли token (Bearer)


module.exports = userRouter;