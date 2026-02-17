"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orders_model_1 = __importDefault(require("../../model/orders.model"));
const errorFunction_1 = __importDefault(require("../../types/errorFunction"));
exports.default = {
    getAllOrders: async (req, res) => {
        try {
            const orders = await orders_model_1.default.find().populate('items');
            res.status(200).json({
                message: "all order fetch success",
                status: 200,
                orders
            });
        }
        catch (error) {
            res.status(500).json((0, errorFunction_1.default)(error));
        }
    },
    changeStatus: async (req, res) => {
        try {
            const { orderId, status } = req.body;
            const order = await orders_model_1.default.updateOne({ _id: orderId }, { status });
            if (!order)
                return res.status(404).json({ message: "Order not found!", status: 404 });
            res.status(200).json({
                message: "status updated!",
                order,
                status: 200
            });
        }
        catch (error) {
            res.status(500).json((0, errorFunction_1.default)(error));
        }
    }
};
