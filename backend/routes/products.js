const express = require('express');
const router = express.Router();
const multer = require('multer');
const Product = require('../models/product');
const checkAutorization = require('../middleware/check-authentifiaction');
const checkAutorizationAdmin = require('../middleware/check-autorization');
const MIME_TYPE_MAP = {
  'image/png':'png',
  'image/jpeg':'jpg',
  'image/jpg':'jpg'
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid){
      error = null;
    }
    //da li ima errora, string sa putanjom gde treba da bude smesteno realtivno u odnosu na server.js
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const extension = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + extension);
  }
});

// umesto productId vracamo ceo product
router.post("", checkAutorization, checkAutorizationAdmin, multer({storage: storage}).single("image"), (req, res, next) => {
  console.log('reached post method');
  const url = req.protocol + '://' + req.get("host");
  console.log(url);
  console.log(req.file.filename);
  const product = new Product({
    name: req.body.name,
    about: req.body.about,
    price: req.body.price,
    cathegory: req.body.cathegory,
    brand: req.body.brand,
    imagePath: url + "/images/" + req.file.filename,
    sizes: JSON.parse(req.body.sizes)
  });
  product.save().then((result) => {
    console.log('Saved product:');
    console.log(product);
    res.status(201).json({
      message: "Products added",
      productCreated: {
        _id: result._id,
        name: result.name,
        about: result.about,
        price: result.price,
        sizes: result.sizes,
        cathegory: res.cathegory,
        brand: result.brand,
        imagePath: result.imagePath
      }
    });
  }).catch(err => {
    res.status(500).json({
      message: "Saving to database failed."
    });
  });

});

router.get("", (req, res, next) => {

  const criterium0 = req.query.criterium0;
  const value0 = req.query.value0;
  const criterium1 = req.query.criterium1;
  const value1 = req.query.value1;
  console.log("get method for fetching products: criterium0 is " + criterium0 + " value0 is " + value0);
  console.log("get method for fetching products: criterium1 is " + criterium1 + " value1 is " + value1);
  let productQuery;


  if(criterium0 == "Cathegory") {
    //po kriterijumu pretrage kategorija i brend
    if(criterium1 == "Brand") {
      console.log('Filter for cathegory and brand');
      array = [];
      array = value1.split('/');
      //poslednji element niza je prazan string
      array.forEach(element => {
        console.log('element is: ' + element);
      });
      productQuery = Product.find({cathegory: value0, brand: {$in:array}}).then(documents => {
        // console.log(documents);
        res.status(200).json({
          message: "Products fetched successfully",
          products: documents
        });
      }).catch(err => {
        res.status(500).json({
          message: "Fetching from database failed."
      });
    });
    } else {
      //samo po kriterujumu kategorije pretraga
      console.log('Filter for cathegory')
      productQuery = Product.find({cathegory: value0}).then(documents => {
        console.log(documents);

        res.status(200).json({
          message: "Products fetched successfully",
          products: documents
        });
      }).catch(err => {
        res.status(500).json({
          message: "Fetching from database failed."
      });
    });
    }

  } else if (criterium1 == "Brand") {
    console.log('Filter for brand');
    array = [];
    array = value1.split('/');
    //poslednji element niza je prazan string
    array.forEach(element => {
      console.log('element is: ' + element);
    });
    productQuery = Product.find({brand: {$in:array}}).then(documents => {
      // console.log(documents);
      res.status(200).json({
        message: "Products fetched successfully",
        products: documents
      });
    }).catch(err => {
      res.status(500).json({
        message: "Fetching from database failed."
    });
  });

  } else {
    console.log("Try to fetch all");
    Product.find().then(documents => {
      //console.log(documents);
      res.status(200).json({
        message: "Products fetched successfully",
        products: documents
      });
    }).catch(err => {
      res.status(500).json({
        message: "Fetching from database failed."
    });
  });
  }


});

router.get("/:_id", (req, res, next) => {
  console.log("Try to get by id");
  Product.findById(req.params._id).then(product => {
    if (product) {
      console.log('Product found!');
      res.status(200).json(product);
    } else {
      console.log('Product not found!');
      res.status(404).json({ message: "Product not found!"});
    }
  }).catch(err => {
    res.status(500).json({
      message: "Fetching from database failed."
  });
});
});

router.delete("/:_id", checkAutorization, checkAutorizationAdmin, (req, res, next) => {
  console.log("Try to delete product");
  Product.deleteOne({_id: req.params._id}).then(result =>{
    console.log(result);
    res.status(200).json({
      message: "Post deleted"
    });
  }).catch(err => {
    res.status(500).json({
      message: "Deleting from database failed."
  });
});
});

//put stavlja potpuno novi na mesto
//patch updejtuje
router.put("/:_id", checkAutorization, checkAutorizationAdmin, multer({storage: storage}).single("image"), (req, res, next) => {
  let imagePath = req.body.imagePath;
  if(req.file) {
    const url = req.protocol + '://' + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  }
  console.log("Try to update product");
  const updatedProduct = new Product({
    name: req.body.name,
    about: req.body.about,
    price: req.body.price,
    cathegory: req.body.cathegory,
    brand: req.body.brand,
    sizes: req.body.sizes,
    _id: req.body._id,
    imagePath: imagePath
  });
  Product.updateOne({_id: req.params._id}, updatedProduct).then(result => {
    console.log(result);
    res.status(200).json({
      message: "Post updated",
      result: result
    });
  }).catch(err => {
    res.status(500).json({
      message: "Updating in database failed."
  });
});
});

module.exports = router;
