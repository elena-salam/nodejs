const Joi = require('joi');
const { listContacts, getContactById, addContact, removeContact, updateContact } = require('../contacts.js');


async function getContacts(req, res) {
    return res.status(200).json(await listContacts());
}


async function getById(req, res){
    const id = parseInt(req.params.contactId);
    const contact = await getContactById(id);
    if(!contact){
        return res.status(404).json({"message": "Not found"});
    }
    return res.status(200).json(contact);
}



async function add(req, res){
    const {name, email, phone} = req.body;
    
    
    const newContact = await addContact(name, email, phone);
    return res.status(200).json(newContact);
}

async function remove(req, res){
    const id = parseInt(req.params.contactId);
    const contact = await getContactById(id);
    if(!contact){
        return res.status(404).json({"message": "Not found"});
    }
    const contactToDelete = await removeContact(id)
    return res.status(200).json(contactToDelete);
}


async function update(req, res){
    const id = parseInt(req.params.contactId);
    const contact = await getContactById(id);
    if(!contact){
        return res.status(404).json({"message": "Not found"});
    }
    const updatedContact = await updateContact(id, req.body);
    return res.status(200). json(updatedContact);

}

function validateCreateContact(req, res, next){
    const schema = Joi.object({
        name: Joi.string().min(1).required(),
        email: Joi.string().min(1).email().required(),
        phone: Joi.string().min(1).required(),
        
    });
    const result = schema.validate(req.body);
    if(result.error){
        return res.status(400).json({message: result.error});
    }
    next();
    
}


function validatePatchContact(req, res, next){
    if(Object.keys(req.body).length === 0){
        return res.status(400).json({"message": "missing fields"})
    }
    
    const schema = Joi.object({
        name: Joi.string().min(1),
        email: Joi.string().min(1).email(),
        phone: Joi.string().min(1),
        
    });
    const result = schema.validate(req.body);
    if(result.error){
        return res.status(400).send(result.error);
    }
    next();
}

module.exports = {
    getContacts,
    getById,
    add,
    remove,
    update,
    validateCreateContact,
    validatePatchContact
    
}
