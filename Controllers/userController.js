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

module.exports.updateUserAvatar = async(req, res) =>{  
    const { _id } = req.user; 
    const { filename } = req.file;
    const updatedUserAvatar = await UserModel.findByIdAndUpdate( _id, { $set: {
      avatarURL: `http://localhost:${process.env.PORT}/images/${filename}`, 
    }}, { new: true, }); // инфа в документации mongoose
    return res.status(200).json({ avatarURL: updatedUserAvatar.avatarURL });
}

