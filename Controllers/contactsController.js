const {UserModel} = require('../models/UserModel');

module.exports.getContactsList = async (req, res) =>{
    const contacts = await UserModel.find()
    
    if(!contacts){
        return res.status(401).json({message: "No contacts"})
    }
    
    return res.status(200). send({contacts});
}

// req.user = user;
//     const {email, subscription} = req.user;
//     return res.status(200).send({email, subscription});

