const mongoose = require('mongoose');

const ordersSchema = mongoose.Schema({
  name: { type: String, required: true},
  lastName: {type: String, required: true},
  address: {type: String, required: true},
  phone: {type: String, required: true},
  state: {type: String, required: true},
  city: {type: String, required: true},
  dateTime: {type: Date, default:Date.now},
  ordered: Boolean,
  zip: {type: String, required: true},
  cart: [{productId: String, size: Number, quantity: Number}]
});

module.exports = mongoose.model('Order', ordersSchema);
