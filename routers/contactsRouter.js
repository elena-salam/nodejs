const express = require('express');
const userRouter = express.Router();
const {asyncWrapper} = require('./helper.js')
const { getContactsList, getContactById, addContact, removeContact, updateContact } = require('../Controllers/contactsController.js');
const {validateCreateContact, validatePatchContact} = require('./ValidationMiddleware.js')

userRouter.get('/', asyncWrapper(getContactsList));
userRouter.get('/:contactId', asyncWrapper(getContactById));
userRouter.post('/', validateCreateContact, asyncWrapper(addContact));
userRouter.delete('/:contactId', asyncWrapper(removeContact));
userRouter.patch('/:contactId', validatePatchContact, asyncWrapper(updateContact));


module.exports = userRouter;