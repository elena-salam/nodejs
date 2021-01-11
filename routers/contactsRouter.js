const express = require('express');
const userRouter = express.Router();
const { getContacts, getById, add, remove, update, validateCreateContact, validatePatchContact } = require('../Controllers/contactsController.js');


userRouter.get('/', getContacts);
userRouter.get('/:contactId', getById);
userRouter.post('/', validateCreateContact, add);
userRouter.delete('/:contactId', remove);
userRouter.patch('/:contactId', validatePatchContact, update);


module.exports = userRouter;