const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const checkAutorization = require('../middleware/check-authentifiaction');
const Product = require('../models/product');
const checkQuantity = require('../middleware/check-quantity');

router.post("", checkAutorization, checkQuantity, async (req, res, next) => {
  console.log('Reached post method for posting orders');

  const order = new Order ({
  name: req.body.name,
  lastName: req.body.lastName,
  address: req.body.address,
  phone: req.body.phone,
  state: req.body.state,
  city: req.body.city,
  ordered: req.body.ordered,
  zip: req.body.zip,
  cart: req.body.cart
  });


  for (let i=0; i< req.body.cart.length;i++) {
    let newSizes = [];
    console.log('Before itteration:');
    console.log(newSizes);
    const product = await Product.findById(req.body.cart[i].productId);
      console.log('Old sizes:');
      console.log(product.sizes);
      for(let j=0; j < product.sizes.length; j++) {
        if(product.sizes[j].size === req.body.cart[i].size) {
          console.log('In if:' + product.sizes[j]);
          const newQuantity = product.sizes[j].count - req.body.cart[i].quantity;
          newSizes.push({size: req.body.cart[i].size, count: newQuantity});
        } else {
          newSizes.push({size: product.sizes[j].size, count: product.sizes[j].count});
        }
      }
        console.log('Novi niz:');
        console.log(newSizes);
        Product.updateOne({_id: product._id}, {sizes: newSizes}).then(result => {
        console.log('Updated:');
        console.log(result);
      });
  }


  order.save().then((result) => {
    console.log(result);
    res.status(201).json({
      message: "Order added",
      productId: result._id,
      productTime: result.dateTime
    });
  });
});

router.get("", checkAutorization, (req, res, next) => {
 Order.find().then(documents => {
    res.status(200).json({
      orders: documents
    });
 });
});

router.get("/:_id", checkAutorization, (req, res, next) => {
  console.log("Try to get order by id");
  Order.findById(req.params._id).then(order => {
    if (order) {
      console.log('Order found!');
      res.status(200).json(order);
    } else {
      console.log('Order not found!');
      res.status(404).json({ message: "Order not found!"});
    }
  });
});

router.delete("/:_id", checkAutorization, (req, res, next) => {
  console.log("Try to delete order");
  Order.deleteOne({_id: req.params._id}).then(result =>{
    console.log(result);
    res.status(200).json({
      message: "Order deleted"
    });
});
});

router.put("/:_id", checkAutorization, (req, res, next) => {
  console.log('Update order');
    const updatedOrder = new Order({
      name: req.body.name,
      lastName: req.body.lastName,
      address: req.body.address,
      phone: req.body.phone,
      state: req.body.state,
      city: req.body.city,
      dateTime: req.body.dateTime,
      ordered: req.body.ordered,
      zip: req.body.zip,
      cart: req.body.cart,
      _id: req.body._id
    });
    Order.updateOne({_id: req.params._id}, updatedOrder).then(result => {
      console.log(result);
    res.status(201).json({
      message: "Product updated"
    });
  });
});

module.exports = router;
