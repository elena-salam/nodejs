const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const userSchema = new mongoose.Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  avatarURL: {type: String},
  subscription: {type: String, enum: ["free", "pro", "premium"], default: "free"},
  token: {type: String, default: ""},
  verificationToken: {type: String}
  });
  
  //статические методы нам нужны, когда мы хотим написать какую-то функцию, 
  // которую будем переиспользовать на нашей модели.
  //statics вызываются у класса "UserModel.hashPassword"
userSchema.statics.hashPassword = async function (password){
  return await bcrypt.hash(password, 10)
}
userSchema.statics.findByVerificationToken = async function(verificationToken){
  return this.findOne({verificationToken}) //находим пользователя по токену верификации
}

  //methods вызываются у экземпляра класса "user.comparePassword"
userSchema.methods.comparePassword = async function(password){
  return await bcrypt.compare(password, this.password);
}

userSchema.methods.createToken = async function(){
  const token = jwt.sign({ id: this._id}, process.env.JWT_SECRET);
  return await this.constructor.findByIdAndUpdate(this._id, {
    token,
  });
};


userSchema.methods.updateToken = async function(){
  return await this.constructor.findByIdAndUpdate(this._id, {token: ""});
}

userSchema.methods.createVerificationToken = async function(verificationToken){
  return this.constructor.findByIdAndUpdate(this._id, {verificationToken}, {new: true});
}

userSchema.methods.removeVerificationToken = async function (){
  return this.constructor.findByIdAndUpdate(this._id, {
    verificationToken: null
  })
}
  
  // определение "модели":
  // первый параметр: имя модели User (в bd будет "users")
  // второй параметр: схема, с которой компилируем модель userSchema
module.exports.UserModel = mongoose.model('User', userSchema);
