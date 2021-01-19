
const {ContactModel} = require('../models/ContactModel.js');


 getContactsList = async (req, res) => {
    const contacts = await ContactModel.find({});
    return res.status(200).json({contacts});
    
}


getContactById = async(req, res) =>{
    const contact = await ContactModel.findById(req.params.contactId);
    if( !contact ){
      return res.status(404).json({message: "Not found"});
    }
    return res.status(200).json({contact});
}

addContact = async(req, res) =>{
    
    const contact = new ContactModel(req.body);
    await contact.save();
    return res.status(201).json({message: "Contact created!"});
    
}


removeContact = async(req, res) =>{
    const contactToDelete = await ContactModel.findByIdAndDelete(req.params.contactId);
    if(!contactToDelete){
        return res.status(404).json({message: "Not found"});
    }
    
    return res.status(200).json({message: "Contact deleted!"});
}

updateContact = async(req, res) =>{
    const contact = await ContactModel.findByIdAndUpdate(req.params.contactId, {$set: req.body});
    if(!contact){
        return res.status(404).json({message: "Not found"})
    }
    return res.status(200).json({message: "Contact modified!"});
    
}

module.exports = {
    getContactsList,
    getContactById,
    addContact,
    removeContact,
    updateContact
    
}
