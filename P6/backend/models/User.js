const mongoose = require('mongoose');
//Utiliser la méthode de mongoose "mongoose-unique-validator" permettant de définir un mail user unique
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// application de la méthode mail unique user
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);