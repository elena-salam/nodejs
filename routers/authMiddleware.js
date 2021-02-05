const jwt = require('jsonwebtoken');
const {UserModel} = require('../models/UserModel');

module.exports = async (req, res,next) =>{
    const header = req.headers['authorization'];
    if(!header){
        return res.status(401).json({message: "No authorized header found"});
    }

    const [type, token] = header.split(' ');
    if(!token){
        return res.status(401).json({message: "No authorized token in header found"});
    }

    const userId = jwt.verify(token, process.env.JWT_SECRET).id;
    const user = await UserModel.findById(userId);
    if(!user){
        return res.status(404).json({message: "User not found"});
    }
    req.user = user;
    
        next();
}