const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwtoken = require ('jsonwebtoken');
const checkAutorization = require('../middleware/check-authentifiaction');


router.post("/signup", (req, res, next) =>{
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
     password: hash
    });
    user.save().then(result => {
      res.status(201).json({
        message: 'User created',
        usedID: result._id,
        userEmail: result.email,
        userPassword: result.password
      });
    }).catch(err => {
      res.status(500).json({
        error: err
      })
    });
  });

});


router.post("/login", (req, res, next) => {
  let fetchedUser;
  console.log('Usao u post metodu za login');
  console.log(req.body.email);
  User.findOne({email: req.body.email}).then(user => {
    console.log('User found:' + user);
    if(!user){
      return res.status(401).json({
        message: 'Authentification failed, wrong email',
      });
    }
    fetchedUser = user;
   return bcrypt.compare(req.body.password, user.password);
  }).then( result => {
    console.log('Password is compared:' + result);
      if(!result) {
        //znaci da je compare false
        return res.status(401).json({
        message: 'Authentification failed, wrong password'
      });
    }
    const token = jwtoken.sign({email: fetchedUser.email, userId: fetchedUser._id},'secret_or_private_key_asdfg',
    {expiresIn: '1h'});
    console.log('Token: ' + token);
    console.log(fetchedUser._id);
    res.status(200).json({
      token: token,
      expiresIn: 3600,
      logedInUserID: fetchedUser._id
    });
  }).catch(err => {
     return res.status(401).json({
       message: 'Error catched: Authentification failed'
     });
   });
});

router.get("", checkAutorization, (req, res, next) => {
  console.log("Try to fetch all users");
  User.find().then(documents => {
    console.log(documents);
    res.status(200).json({
      message: "Users fetched successfully",
      users: documents
    });
});
});

router.get("/:email", (req, res, next) => {
  console.log("Check if email exist");
  console.log(req.params.email);
  User.findOne({email: req.params.email}).then(user => {
    console.log(user);
    let userExist = false;
    if(user) {
      userExist = true;
    }
    console.log(userExist);
    res.status(200).json({
      found: userExist
    });
  });
});

router.delete("/:_id", checkAutorization, (req, res, next) => {
  console.log("Try to delete user");
  User.deleteOne({_id: req.params._id}).then(result =>{
    console.log(result);
    res.status(200).json({
      message: "User deleted"
    });
  });
})

//raw form password = lose

module.exports = router;
