const {UserModel} = require('../models/UserModel.js');
const createAvatar = require('../avatar/avatarGenerator.js');
const sendEmail = require('../utils/sendEmail.js');
const uuid = require('uuid');

module.exports.registration = async(req, res) =>{

    const existingEmail = await UserModel.findOne({email:req.body.email}); 
    
    if( existingEmail ){
      return res.status(409).send("Email in use");
    } 
    
    const passwordHash = await UserModel.hashPassword(req.body.password);
    const avatarName = await createAvatar();
    const avatarUrlString = `http://localhost:${process.env.PORT}/images/${avatarName}`

    const user = new UserModel({
        email: req.body.email,
        password: passwordHash,
        avatarURL: avatarUrlString,
        subscription: req.body.subscroption

    })
    
    await user.save(); //user was saved in base
    const verificationToken = uuid.v4(); //creating token
    await user.createVerificationToken(verificationToken); //save token in base;
    await sendEmail(user.email, verificationToken); //sending email

    return res.status(201).json({
        email: user.email, 
        avatarUrl: user.avatarURL,
        subscription: user.subscription
    });
    
}
module.exports.login = async(req, res) =>{
    
    // достаем пользователя сначала по email, чтобы более детально увидеть где ошибка(в email или password):
    const user = await UserModel.findOne({email: req.body.email});
    if(!user){
        res.status(400).json({message: `User with email ${req.body.email} not found`});
    }
    // теперь нам нужно сравнить пароль:
    if(!(user.comparePassword(req.body.password))){
        return res.status(400).json({message: "Wrong password"});
    }

    await user.createToken();
    
    const {token} = await user.createToken();
    return res.status(200).json({token, user:{
        id: user._id,
        email: user.email, 
        subscription: user.subscription
    }});
}

module.exports.logout = async(req, res, next) =>{
    
    const user = req.user;
    
    if(!user){
        return res.status(400).json({message: "Not found"});
    }
    
    const userForLogout = await user.updateToken();//TypeError: user.updateToken is not a function
    if(!userForLogout){
        return res.status(400).json({message: "Bad request"});
    }
     return res.status(204).send();
    
}

module.exports.verifyEmail = async(req, res, next) =>{
    try{
        const {verificationToken} = req.params;
        const user = await UserModel.findByVerificationToken(verificationToken);
        if(!user){
            return res.status(404).send("User not found");
        }
        await user.removeVerificationToken();
        return res.status(200).send("Verified");

    } catch (err) {
        next(err)
    }
}




