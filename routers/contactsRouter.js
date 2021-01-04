const express = require('express');
const router = express.Router();
const {
    getContacts,
    getById,
    add,
    remove,
    update,
    validateCreateContact,
    validatePatchContact
} = require('../Controllers/contactsController.js');


router.get('/', getContacts);
router.get('/:contactId', getById);
router.post('/', validateCreateContact, add);
router.delete('/:contactId', remove);
router.patch('/:contactId', validatePatchContact, update);

module.export = router;