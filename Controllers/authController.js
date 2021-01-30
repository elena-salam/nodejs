const {UserModel} = require('../models/UserModel.js');

module.exports.registration = async(req, res) =>{

    const existingEmail = await UserModel.findOne({email:req.body.email}); 
    console.log(existingEmail);
    if( existingEmail ){
      return res.status(409).send("Email in use");
    } 
    
    const passwordHash = await UserModel.hashPassword(req.body.password);
    const user = new UserModel({
        email: req.body.email,
        password: passwordHash,
        subscription: req.body.subscroption

    })
    await user.save();
    return res.status(201).json({
        email: user.email, 
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




