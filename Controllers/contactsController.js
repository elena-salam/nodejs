
const {Contact} = require('../models/model.js');


 getContacts = async (req, res) => {
    const contacts = await Contact.find({});
    res.json({contacts});
    
}

getById = async(req, res) =>{
    const contact = await Contact.findById(req.params.contactId);
    if(!contact){
      return res.status(400).json({message: `No contact with id ${req.params.contactId} has been found`})
    }
    res.json({contact});
}

add = async(req, res) =>{
    
      const contact = new Contact({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        subscription: req.body.subscription,
        password: req.body.password
        // token: req.body.token
      });
      await contact.save();
      res.json({message: "Contact created!"});
    
}

remove = async(req, res) =>{
    await Contact.findByIdAndDelete(req.params.contactId);
    res.json({message: "Contact deleted!"});
}

update = async(req, res) =>{
    await Contact.findByIdAndUpdate(req.params.contactId, {$set: req.body});
    res.json({message: "Contact modified!"});
    
}

module.exports = {
    getContacts,
    getById,
    add,
    remove,
    update
    
}
