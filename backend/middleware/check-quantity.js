const Product = require('../models/product');
module.exports = async(req, res, next) => {

  console.log(req.body.cart);

  /*for(let i=0; i < req.body.cart.length; i++) {
    console.log('Object from order cart:');
    //console.log(item.productId);
    Product.findById(req.body.cart[i].productId).then(product => {
      console.log(product)
      console.log('User ordered for size:' + req.body.cart[i].size + ' quanitity:' + req.body.cart[i].quantity);
      console.log('Item found in database, size quantity paires are:');
      console.log(product.sizes);
      for(const sizeQuantityPair of product.sizes) {
        if(sizeQuantityPair.size === req.body.cart[i].size) {
          console.log('In if:' + sizeQuantityPair);
          if(sizeQuantityPair.count <= req.body.cart[i].quantity) {
            console.log('Less products of size than ordered');
            return res.status(500).json({
              message: 'Not enough products in stock',
              missing: product
            });
          }
        }
      }
    });
  }

    next();*/
  for(let i = 0; i < req.body.cart.length; i++) {
  const product = await Product.findById(req.body.cart[i].productId);
  let j = 0;
  for (j = 0; j < product.sizes.length; j++) {
    if (product.sizes[j].size === req.body.cart[i].size) {
      if (product.sizes[j].count <= req.body.cart[i].quantity) {
        break;
      }
    }
  }

  if (j !== product.sizes.length) {
    return res.status(500).json({
      message: 'Not enough products in stock',
      missing: product
    });
  }
  break;
  }
  next();

};


