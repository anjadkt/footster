require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Products = require('./src/model/products.model.js');
const data = require('../footster-frontend/db.json');

const {MONGO_URL , PORT} = process.env ;

mongoose.connect(MONGO_URL)
.then(()=>{
  console.log('Mongo DB Connected !')
  app.listen(PORT,()=>{
    console.log(`Server is Listening @ http://localhost:${PORT}`);
  })
})
.catch((error)=>{
  console.log(error.message)
});

(async()=>{
  try {
    await Products.insertMany(data.products);
    console.log("products inserted!")
  } catch (error) {
    console.log(error.message);
  }
})();