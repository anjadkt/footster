"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orders_model_1 = __importDefault(require("../../model/orders.model"));
const users_model_1 = __importDefault(require("../../model/users.model"));
const products_model_1 = __importDefault(require("../../model/products.model"));
const errorFunction_1 = __importDefault(require("../../types/errorFunction"));
exports.default = {
    calcDashboard: async (req, res) => {
        try {
            const totalUsers = await users_model_1.default.countDocuments({ role: "user" });
            const totalOrders = await orders_model_1.default.countDocuments();
            const totalProducts = await products_model_1.default.countDocuments();
            const orders = await orders_model_1.default.find();
            const totalRevenue = orders.reduce((acc, ord) => {
                return acc + ord.paymentDetails.total;
            }, 0);
            res.status(200).json({
                totalOrders,
                totalProducts,
                totalUsers,
                totalRevenue
            });
        }
        catch (error) {
            res.status(500).json((0, errorFunction_1.default)(error));
        }
    }
};
