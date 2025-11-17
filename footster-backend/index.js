require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const {MONGO_URL , PORT , FRONT_URL} = process.env ;

//middlewares
app.use(cors({
  origin : FRONT_URL,
  Credential : true
}));

app.use(express.json());


//routes
const productRouter = require('./src/router/products.route.js')
app.use("/products",productRouter)






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

