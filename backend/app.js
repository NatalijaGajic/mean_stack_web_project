const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const productsRoutes = require ("./routes/products");
const usersRoutes = require ("./routes/users");
const ordersRouter = require('./routes/orders');

const Product = require('../backend/models/product');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost:27017/storedb' , { useNewUrlParser: true, useCreateIndex:true })
.then(() => {
  console.log('Connected!');
}).catch(() => {
  console.log('Failed');

});

app.use(bodyParser.json());
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  next();
});

app.use("/api/products",productsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/orders", ordersRouter);

module.exports = app;
