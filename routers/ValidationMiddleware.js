const Joi = require('joi');

module.exports.validateUserRegistration = (req, res, next) =>{
  const schema = Joi.object({
    email: Joi.string().min(3).email().required(),
    password: Joi.string().min(3).required(),
    subscription: Joi.string().min(3)
  });
  const result = schema.validate(req.body);
  if(result.error){
    return res.status(400).json({message: result.error});
  }
  next();
  
}

module.exports.validateUserLogin = (req, res, next) =>{
  const schema = Joi.object({
    email: Joi.string().min(3).email().required(),
    password: Joi.string().min(3).required(),
    
  });
  const result = schema.validate(req.body);
  if(result.error){
    return res.status(400).json({message: result.error});
  }
  next();
  
}