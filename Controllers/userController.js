const {UserModel} = require('../models/UserModel');

module.exports.getCurrentUser = async(req, res) =>{
    const user = await UserModel.findById(req.user.id);
    if(!user){
        return res.status(401).json({message: "Not authorized"})
    }
     req.user = user;
    const {email, subscription} = req.user;
    return res.status(200).send({email, subscription});
    
}

