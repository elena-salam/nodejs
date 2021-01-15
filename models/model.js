const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phone: {type: String, required: true},
    subscription: {type: String, requires: true},
    password: {type: String, requires: true, unique: true},
    token: {type: String, default: ""}
  });
  
  // определение "модели":
  // первый параметр: имя коллекции "Contacts"
  // второй параметр: схема, с которой компилируем модель usersSchema
  module.exports.Contact = mongoose.model('Contacts', schema);