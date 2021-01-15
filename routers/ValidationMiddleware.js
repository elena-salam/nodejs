const Joi = require('joi');

module.exports.validateCreateContact = (req, res, next) =>{
  const schema = Joi.object({
    name: Joi.string().min(1).required(),
    email: Joi.string().min(1).email().required(),
    phone: Joi.string().min(1).required(),
    subscription: Joi.string().min(3).required(),
    password: Joi.string().min(8).required(),
    token: Joi.string()
        
});
  const result = schema.validate(req.body);
  if(result.error){
    return res.status(400).json({message: result.error});
  }
  next();
  
}


module.exports.validatePatchContact = (req, res, next) => {
  if(Object.keys(req.body).length === 0){
    return res.status(400).json({"message": "missing fields"})
  }
    
  const schema = Joi.object({
    name: Joi.string().min(1),
    email: Joi.string().min(1).email(),
    phone: Joi.string().min(1),
    subscription: Joi.string().min(3),
    password: Joi.string().min(8),
    token: Joi.string()
        
  });
  const result = schema.validate(req.body);
  if(result.error){
    return res.status(400).send(result.error);
    }
  next();
}
