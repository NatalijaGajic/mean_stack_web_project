const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: { type: String, required: true},
  about: String,
  price: {type: String, required: true},
  cathegory: String,
  brand: String,
  sizes: [{size: Number, count: Number}],
  imagePath: {type: String, required: true}
});

module.exports = mongoose.model('Product', productSchema);
//omogucava da se koristi u drugim fajlovima
