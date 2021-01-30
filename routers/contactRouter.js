const express = require('express');
const router = express.Router();


const {getContactsList} = require('../Controllers/contactsController.js');

router.get('/', getContactsList);

module.exports = router;
