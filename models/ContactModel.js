const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phone: {type: String, required: true},
    subscription: {type: String},
    password: {type: String, requires: true},
    token: {type: String, default: ""}
  });
  
  // определение "модели":
  // первый параметр: имя модели Contact (при создании коллекции наименование переводится в нижний регистр, мн.ч.)
  // второй параметр: схема, с которой компилируем модель contactSchema
  module.exports.ContactModel = mongoose.model('Contact', contactSchema);
