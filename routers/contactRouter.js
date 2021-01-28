const express = require('express');
const router = express.Router();
const {asyncWrapper} = require('../routers/helper.js');
const authMiddleware = require("../routers/authMiddleware.js");

const {getContacts} = require('../Controllers/contactsController.js');

router.get('/', authMiddleware, asyncWrapper(getContacts));

module.exports = router;