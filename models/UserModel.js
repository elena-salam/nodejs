const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  subscription: {type: String, enum: ["free", "pro", "premium"], default: "free"},
  token: {type: String, default: "", required: false}
  });
  
  // определение "модели":
  // первый параметр: имя модели User (при создании коллекции наименование переводится в нижний регистр, мн.ч.)
  // второй параметр: схема, с которой компилируем модель userSchema
  module.exports.UserModel = mongoose.model('User', userSchema);
