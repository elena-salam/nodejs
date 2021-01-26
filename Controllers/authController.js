
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {UserModel} = require('../models/UserModel.js');


module.exports.registration = async(req, res) =>{
    //webinar 1h:14min не работает 
    // const existingEmail = await UserModel.findUserByEmail(req.body.email); 
    // if( !existingEmail ){
    //   return res.status(409).send("Email in use");
    // } 
    const user = new UserModel({
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
        subscription: req.body.subscroption

    })
    await user.save();
    return res.status(201).json({email: user.email, subscription: user.subscription});
    
}
module.exports.login = async(req, res) =>{
    
    // достаем пользователя сначала по email, чтобы более детально увидеть где ошибка(в email или password):
    const user = await UserModel.findOne({email: req.body.email});
    if(!user){
        res.status(400).json({message: `User with email ${req.body.email} not found`});
    }
    // теперь нам нужно сравнить пароль:
    if(!(await bcrypt.compare(req.body.password, user.password))){
        return res.status(400).json({message: "Wrong password"});
    }
    //в token пароль не передаем!
    const token = await jwt.sign({
        id: user._id,
        email: user.email,
        subscription: user.subscription
    }, process.env.JWT_SECRET); //надо ли здесь указывать: require('dotenv').config()?

    return res.status(200).json({token});
}

module.exports.logout = async(req, res, next) =>{

    const user = req.user;
    if(!user){
        return res.status(400).json({message: "Not found"});
    }
    const userForLogout = await user.updateToken(user._id, null);
    if(!userForLogout){
        return res.status(400).json({message: "Bad request"});
    }
    return res.status(204).send();
    
}


