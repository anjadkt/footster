"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_model_1 = __importDefault(require("../../model/users.model"));
const orders_model_1 = __importDefault(require("../../model/orders.model"));
const mongoose_1 = require("mongoose");
const errorFunction_1 = __importDefault(require("../../types/errorFunction"));
exports.default = {
    getAllUsers: async (req, res) => {
        try {
            const users = await users_model_1.default.aggregate([
                { $match: { role: "user" } },
                {
                    $project: {
                        password: 0,
                        cart: 0,
                        favorite: 0
                    }
                }
            ]);
            res.status(200).json({
                users,
                message: "fetch all users success!",
                status: 200
            });
        }
        catch (error) {
            res.status(500).json((0, errorFunction_1.default)(error));
        }
    },
    getUserDetails: async (req, res) => {
        try {
            const email = req.query.email || req.user.email;
            if (email) {
                const user = await users_model_1.default.findOne({ email }).populate("favorite").populate("cart.product");
                if (!user)
                    return res.status(404).json({ message: "User Not found", status: 404 });
                res.status(200).json({
                    name: user.name,
                    status: user.status,
                    cart: user.cart,
                    favorite: user.favorite,
                    role: user.role,
                    address: user.address
                });
                return;
            }
            const users = await users_model_1.default.aggregate([
                {
                    $project: {
                        password: 0,
                        cart: 0,
                        favorite: 0
                    }
                }
            ]);
            res.status(200).json({
                users,
                message: "fetch all users success!",
                status: 200
            });
        }
        catch (error) {
            res.status(500).json((0, errorFunction_1.default)(error));
        }
    },
    getSingleUser: async (req, res) => {
        try {
            const id = req.params.id;
            if (typeof id !== "string") {
                throw new Error("Invalid id");
            }
            const objectId = new mongoose_1.Types.ObjectId(id);
            const user = await users_model_1.default.aggregate([
                {
                    $match: {
                        _id: objectId
                    }
                },
                {
                    $lookup: {
                        from: "orders",
                        localField: "orders",
                        foreignField: "_id",
                        as: "orderDetails"
                    }
                },
                {
                    $project: {
                        password: 0,
                        cart: 0,
                        favorite: 0,
                        orders: 0
                    }
                }
            ]);
            if (!user)
                return res.status(404).json({ message: "User Not Found!", status: 404 });
            res.status(200).json({
                message: "user fetch success!",
                user: user[0],
                status: 200
            });
        }
        catch (error) {
            res.status(500).json((0, errorFunction_1.default)(error));
        }
    },
    blockUser: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await users_model_1.default.findOne({ _id: id });
            if (!user)
                return res.status(404).json({ message: "User Not Found!", status: 404 });
            user.status = user.status === "Active" ? "Blocked" : "Active";
            await user.save();
            res.status(200).json({
                message: `User ${user.status}!`,
                status: 200
            });
        }
        catch (error) {
            res.status(500).json((0, errorFunction_1.default)(error));
        }
    },
    changeOrderStatus: async (req, res) => {
        try {
            const { id, status } = req.body;
            const order = await orders_model_1.default.findOneAndUpdate({ _id: id }, { status });
            if (!order)
                return res.status(404).json({ message: "Order Not Found!", status: 404 });
            res.status(200).json({
                message: `Order modified to ${status} !`,
                order,
                status: 200
            });
        }
        catch (error) {
            res.status(500).json((0, errorFunction_1.default)(error));
        }
    }
};
