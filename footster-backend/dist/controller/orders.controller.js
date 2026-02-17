"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orders_model_1 = __importDefault(require("../model/orders.model"));
const users_model_1 = __importDefault(require("../model/users.model"));
const errorFunction_1 = __importDefault(require("../types/errorFunction"));
exports.default = {
    addUserOrders: async (req, res) => {
        try {
            const { id } = req.user;
            const { paymentDetails, items, to } = req.body;
            const order = await orders_model_1.default.create({
                userId: id,
                date: new Date().toLocaleString(),
                status: "Placed",
                paymentDetails,
                items,
                to
            });
            await users_model_1.default.findOneAndUpdate({ _id: id }, { $push: { "orders": order._id }, cart: [] });
            res.status(200).json({
                message: "Order successfull!",
                status: 200,
                orderId: order._id
            });
        }
        catch (error) {
            res.status(500).json((0, errorFunction_1.default)(error));
        }
    },
    getAOrder: async (req, res) => {
        try {
            const { id } = req.params;
            const order = await orders_model_1.default.findOne({ _id: id });
            if (!order)
                return res.status(404).json({ message: "Order Not Found!", status: 404 });
            res.status(200).json({
                order,
                status: 200,
                message: "Order Found!"
            });
        }
        catch (error) {
            res.status(500).json((0, errorFunction_1.default)(error));
        }
    },
    getUserOrders: async (req, res) => {
        try {
            const id = req.user.id;
            const user = await users_model_1.default.findOne({ _id: id }).populate("orders");
            if (!user)
                return res.status(404).json({ message: "User Not Found!", status: 404 });
            res.status(200).json({
                message: "Orders fetch success!",
                orders: user.orders,
                status: 200
            });
        }
        catch (error) {
            res.status(500).json((0, errorFunction_1.default)(error));
        }
    }
};
