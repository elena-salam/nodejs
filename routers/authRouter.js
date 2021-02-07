const express = require('express');
const router = express.Router();
const {asyncWrapper} = require('./helper.js')
const {registration, login, logout, verifyEmail} = require('../Controllers/authController');
const { validateUserRegistration, validateUserLogin } = require('./ValidationMiddleware.js');
const authValidation = require('./authMiddleware.js'); //jwt token in header Auth



router.post('/register', validateUserRegistration, asyncWrapper(registration));
router.post('/login', validateUserLogin, asyncWrapper(login));
router.post('/logout', authValidation, asyncWrapper(logout)); //проверяем валидный ли token
router.get('/verify/:verificationToken', verifyEmail)

module.exports = router;