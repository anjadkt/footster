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
const isBlocked = require('./src/middleware/isBlockedUser.js');

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
app.use('/cart',verifyToken,isBlocked,cartRouter);

const wishRouter = require('./src/router/wish.route.js');
app.use('/wishlist',verifyToken,isBlocked,wishRouter);

const addressRouter = require('./src/router/address.route.js');
app.use('/address',verifyToken,isBlocked,addressRouter);

const ordersRouter = require('./src/router/orders.route.js');
app.use('/user/orders',verifyToken,isBlocked,ordersRouter);

//admin routes

const adminRouter = require('./src/router/admin/admin.route.js');
app.use('/admin',adminRouter);

const adminOrderRouter = require('./src/router/admin/aOrders.route.js');
app.use('/admin/order',verifyToken,verifyUser,adminOrderRouter);

const dashBoardRouter =require('./src/router/admin/dashboard.route.js');
app.use('/admin/dashboard',verifyToken,verifyUser,dashBoardRouter);

const adminProductRouter = require('./src/router/admin/aProduct.route.js');
app.use('/admin/products',verifyToken,verifyUser,adminProductRouter);

const adminUserRouter = require('./src/router/admin/aUsers.route.js');
app.use('/admin/users',verifyToken,verifyUser,adminUserRouter);

app.use((req, res, next) => {
  const error = new Error(`Route not found - ${req.originalUrl}`);
  error.status = 404;
  next(error);
});

app.use(require('./src/middleware/errorhandle.js'));

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

