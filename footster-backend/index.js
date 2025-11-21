require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');


const {MONGO_URL , PORT , FRONT_URL} = process.env ;

//middleware modules
const cors = require('cors');
const cookieParser = require('cookie-parser');
const verifyToken = require('./src/middleware/verifyToken.js');
const verifyUser = require('./src/middleware/verifyUser.js');

//middlewares
app.use(cors({
  origin : FRONT_URL,
  Credential : true
}));

app.use(express.json());
app.use(cookieParser());


//routes
const productRouter = require('./src/router/products.route.js')
app.use("/products",productRouter)

const userRouter = require('./src/router/user.route.js');
app.use('/user',userRouter);

const cartRouter = require('./src/router/cart.route.js');
app.use('/cart',verifyToken,cartRouter);

const wishRouter = require('./src/router/wish.route.js');
app.use('/wishlist',verifyToken,wishRouter);

const addressRouter = require('./src/router/address.route.js');
app.use('/address',verifyToken,addressRouter);

const ordersRouter = require('./src/router/orders.route.js');
app.use('/user/orders',verifyToken,ordersRouter);

//admin routes

const adminRouter = require('./src/router/admin/admin.route.js');
app.use('/admin',adminRouter);

const adminOrderRouter = require('./src/router/admin/aOrders.route.js');
app.use('/admin/order',verifyToken,verifyUser,adminOrderRouter);


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

