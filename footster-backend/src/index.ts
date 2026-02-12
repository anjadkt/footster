import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import verifyToken from './middleware/verifyToken'
import verifyUser from './middleware/verifyUser'
import isBlocked from './middleware/isBlockedUser'
import getEnv from './config/dot'

const app = express();

//middlewares
app.use(cors({
  origin : getEnv("FRONT_URL"),
  credentials : true
}));

app.use(express.json());
app.use(cookieParser());


//routes
import productRouter from './router/products.route'
app.use("/products",productRouter);

import userRouter from './router/user.route'
app.use('/user',userRouter);

import cartRouter from './router/cart.route'
app.use('/cart',verifyToken,isBlocked,cartRouter);

import wishRouter from './router/wish.route'
app.use('/wishlist',verifyToken,isBlocked,wishRouter);

import addressRouter from './router/address.route'
app.use('/address',verifyToken,isBlocked,addressRouter);

import ordersRouter from './router/orders.route'
app.use('/user/orders',verifyToken,isBlocked,ordersRouter);

//admin routes

import adminRouter from './router/admin/admin.route'
app.use('/admin',adminRouter);

import adminOrderRouter from './router/admin/aOrders.route'
app.use('/admin/order',verifyToken,verifyUser,adminOrderRouter);

import dashBoardRouter from './router/admin/dashboard.route'
app.use('/admin/dashboard',verifyToken,verifyUser,dashBoardRouter);

import adminProductRouter from './router/admin/aProduct.route'
app.use('/admin/products',verifyToken,verifyUser,adminProductRouter);

import adminUserRouter from './router/admin/aUsers.route'
app.use('/admin/users',verifyToken,verifyUser,adminUserRouter);

app.use((req, res, next) => {
  const error = new Error(`Route not found - ${req.originalUrl}`);
  next(error);
});

app.use(require('./src/middleware/errorhandle.js'));

mongoose.connect(getEnv("MONGO_URL"))
.then(()=>{
  console.log('Mongo DB Connected !')
  app.listen(getEnv("PORT"),()=>{
    console.log(`Server is Listening @ http://localhost:${getEnv("PORT")}`);
  })
})
.catch((error)=>{
  console.log(error.message)
});

