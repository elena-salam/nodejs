const express = require('express');
const userRouter = express.Router();
const {asyncWrapper} = require('./helper.js')
const { getContacts, getById, add, remove, update } = require('../Controllers/contactsController.js');
const {validateCreateContact, validatePatchContact} = require('./ValidationMiddleware.js')

userRouter.get('/', asyncWrapper(getContacts));
userRouter.get('/:contactId', asyncWrapper(getById));
userRouter.post('/', validateCreateContact, asyncWrapper(add));
userRouter.delete('/:contactId', asyncWrapper(remove));
userRouter.patch('/:contactId', validatePatchContact, asyncWrapper(update));


module.exports = userRouter;