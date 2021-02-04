const express = require('express');
const userRouter = express.Router();
const uploadMiddleware = require('../middlewares/multerConfig.js');
// const {asyncWrapper} = require('./helper.js')
const { getCurrentUser, updateUserAvatar } = require('../Controllers/userController.js');
const authMiddleware = require('./authMiddleware.js');
const minifyImage = require('../middlewares/minimizeImgMiddleware');

userRouter.get('/current', authMiddleware, getCurrentUser); //проверяем валидный ли token

userRouter.post('/avatars', uploadMiddleware.single('avatar'), minifyImage, updateUserAvatar);

module.exports = userRouter;