"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const verifyToken_1 = __importDefault(require("./middleware/verifyToken"));
const verifyUser_1 = __importDefault(require("./middleware/verifyUser"));
const isBlockedUser_1 = __importDefault(require("./middleware/isBlockedUser"));
const products_route_1 = __importDefault(require("./router/products.route"));
const user_route_1 = __importDefault(require("./router/user.route"));
const cart_route_1 = __importDefault(require("./router/cart.route"));
const wish_route_1 = __importDefault(require("./router/wish.route"));
const address_route_1 = __importDefault(require("./router/address.route"));
const orders_route_1 = __importDefault(require("./router/orders.route"));
const admin_route_1 = __importDefault(require("./router/admin/admin.route"));
const aOrders_route_1 = __importDefault(require("./router/admin/aOrders.route"));
const dashboard_route_1 = __importDefault(require("./router/admin/dashboard.route"));
const aProduct_route_1 = __importDefault(require("./router/admin/aProduct.route"));
const aUsers_route_1 = __importDefault(require("./router/admin/aUsers.route"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("./config/dotenv"));
const express_1 = __importDefault(require("express"));
const errorhandle_1 = __importDefault(require("./middleware/errorhandle"));
const app = (0, express_1.default)();
//middlewares
app.use((0, cors_1.default)({
    origin: (0, dotenv_1.default)("FRONT_URL"),
    credentials: true
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
//routes
app.use("/products", products_route_1.default);
app.use('/user', user_route_1.default);
app.use('/cart', verifyToken_1.default, isBlockedUser_1.default, cart_route_1.default);
app.use('/wishlist', verifyToken_1.default, isBlockedUser_1.default, wish_route_1.default);
app.use('/address', verifyToken_1.default, isBlockedUser_1.default, address_route_1.default);
app.use('/user/orders', verifyToken_1.default, isBlockedUser_1.default, orders_route_1.default);
//admin routes
app.use('/admin', admin_route_1.default);
app.use('/admin/order', verifyToken_1.default, verifyUser_1.default, aOrders_route_1.default);
app.use('/admin/dashboard', verifyToken_1.default, verifyUser_1.default, dashboard_route_1.default);
app.use('/admin/products', verifyToken_1.default, verifyUser_1.default, aProduct_route_1.default);
app.use('/admin/users', verifyToken_1.default, verifyUser_1.default, aUsers_route_1.default);
app.use((req, res, next) => {
    const error = new Error(`Route not found - ${req.originalUrl}`);
    next(error);
});
app.use(errorhandle_1.default);
mongoose_1.default.connect((0, dotenv_1.default)("MONGO_URL"))
    .then(() => {
    console.log('Mongo DB Connected !');
    app.listen((0, dotenv_1.default)("PORT"), () => {
        console.log(`Server is Listening @ http://localhost:${(0, dotenv_1.default)("PORT")}`);
    });
})
    .catch((error) => {
    console.log(error.message);
});
