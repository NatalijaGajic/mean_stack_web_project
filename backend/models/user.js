const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: {type: String, required:true, unique:true},
  password: {type: String, required:true}
});

 userSchema.plugin(uniqueValidator);
 //sad se dobija error

module.exports = mongoose.model('User', userSchema);
//unique ne baca error, mora dodatna validacija, unique samo optimizacija jer zna da ce biti unique
