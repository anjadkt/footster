import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import verifyToken from './middleware/verifyToken'
import verifyUser from './middleware/verifyUser'
import isBlocked from './middleware/isBlockedUser'
import getEnv from './config/dot'

import productRouter from './router/products.route'
import userRouter from './router/user.route'
import cartRouter from './router/cart.route'
import wishRouter from './router/wish.route'
import addressRouter from './router/address.route'
import ordersRouter from './router/orders.route'
import adminRouter from './router/admin/admin.route'
import adminOrderRouter from './router/admin/aOrders.route'
import dashBoardRouter from './router/admin/dashboard.route'
import adminProductRouter from './router/admin/aProduct.route'
import adminUserRouter from './router/admin/aUsers.route'
import errorhandle from './middleware/errorhandle'

const app = express();

//middlewares
app.use(cors({
  origin : getEnv("FRONT_URL"),
  credentials : true
}));
app.use(express.json());
app.use(cookieParser());


//routes
app.use("/products",productRouter);
app.use('/user',userRouter);
app.use('/cart',verifyToken,isBlocked,cartRouter);
app.use('/wishlist',verifyToken,isBlocked,wishRouter);
app.use('/address',verifyToken,isBlocked,addressRouter);
app.use('/user/orders',verifyToken,isBlocked,ordersRouter);

//admin routes
app.use('/admin',adminRouter);
app.use('/admin/order',verifyToken,verifyUser,adminOrderRouter);
app.use('/admin/dashboard',verifyToken,verifyUser,dashBoardRouter);
app.use('/admin/products',verifyToken,verifyUser,adminProductRouter);
app.use('/admin/users',verifyToken,verifyUser,adminUserRouter);

app.use((req, res, next) => {
  const error = new Error(`Route not found - ${req.originalUrl}`);
  next(error);
});

app.use(errorhandle);

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

