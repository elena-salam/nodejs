const Joi = require('joi');
const { listContacts, getContactById, addContact, removeContact, updateContact } = require('../contacts.js');

async function getContacts(req, res){
    return res.status(200).json(await listContacts());

};

async function getById(req, res){
    const id = parseInt(req.params.contactId);
    const contact = await getContactById(id);
    if(!id){
        return res.status(404).json({"message": "Not found"});
    }
    return res.status(200).json(contact);
}

async function add(req, res){
    const {name, email, phone} = req.body;
    // need to find another solution
    if(name === undefined || email === undefined || phone === undefined){
        res.status(404).json ({"message": "missing required name field"});
    }
    const newContact = await addContact(name, email, phone);
    return res.status(200).json(newContact);
}
async function remove(req, res){
    const id = parseInt(req.params.contactId);
    const contact = await getContactById(id);
    if(!contact){
        return res.status(404).json({"message": "Not found"});
    }
    const contactToDelete = await removeContact(contactId)
    return res.status(200).json(contactToDelete);
}


// async function updateContact(req, res)

function validateCreateContact(req, res){
    const contactRules = Joi.object({
        name: Joi.string().min(1).required(),
        email: Joi.string().min(1).email().required(),
        phone: Joi.string().min(1).required(),
    });
    const validationRules = Joi.validate(req.query, contactRules);
    if(contactRules.error){
        return res.status(400).send(validationRules.error);
    }
    
}
function validatePatchContact(req, res){
    // the same as previous withour "required"
}

module.export = {
    getContacts,
    getById,
    add,
    remove,
    update,
    validateCreateContact,
    validatePatchContact,
}

