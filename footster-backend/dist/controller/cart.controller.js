"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_model_1 = __importDefault(require("../model/users.model"));
const errorFunction_1 = __importDefault(require("../types/errorFunction"));
exports.default = {
    addToCart: async (req, res) => {
        try {
            const user = await users_model_1.default.findOne({ _id: req.user?.id });
            if (!user)
                return res.status(404).json({ message: "user not found!", status: 404 });
            const { id: productId, quantity } = req.body;
            const exist = user.cart.find((p) => p.product.toString() === productId);
            if (exist) {
                exist.quantity += Number(quantity) || 1;
            }
            else {
                user.cart.push({
                    product: productId,
                    quantity
                });
            }
            await user.save();
            const userDoc = await users_model_1.default.findOne({ _id: req.user?.id }).populate("cart.product");
            if (!userDoc) {
                return res.status(404).json({
                    message: "User not found",
                    status: 404
                });
            }
            res.json({
                cart: userDoc.cart,
                message: "Item added succesfully!",
                status: 200
            });
        }
        catch (error) {
            res.status(500).json((0, errorFunction_1.default)(error));
        }
    },
    getCart: async (req, res) => {
        try {
            const user = await users_model_1.default.findOne({ _id: req.user?.id }).populate("cart.product");
            if (!user) {
                return res.status(404).json({
                    message: "User not found",
                    status: 404
                });
            }
            res.json({
                cart: user.cart,
                name: user.name,
                message: "cart fetch success!",
                status: 200
            });
        }
        catch (error) {
            res.status(500).json((0, errorFunction_1.default)(error));
        }
    },
    removeItem: async (req, res) => {
        try {
            const { id } = req.body;
            const details = await users_model_1.default.updateOne({ _id: req.user?.id }, { $pull: { cart: { product: id } } });
            if (!details.modifiedCount)
                return res.status(404).json({ message: "Product Not Found!", status: 404 });
            const user = await users_model_1.default.findOne({ _id: req.user?.id }).populate("cart.product");
            if (!user) {
                return res.status(404).json({
                    message: "User not found",
                    status: 404
                });
            }
            res.status(200).json({
                message: "Product Removed !",
                status: 200,
                cart: user.cart
            });
        }
        catch (error) {
            res.status(500).json((0, errorFunction_1.default)(error));
        }
    },
    incOrDec: async (req, res) => {
        try {
            const { id } = req.body;
            const action = req.params.action;
            let product;
            if (action === "inc") {
                product = await users_model_1.default.findOneAndUpdate({ _id: req.user?.id, "cart.product": id }, { $inc: {
                        "cart.$.quantity": 1
                    } });
            }
            if (action === "dec") {
                product = await users_model_1.default
                    .findOneAndUpdate({ _id: req.user?.id, "cart.product": id, "cart.quantity": { $gt: 1 } }, { $inc: {
                        "cart.$.quantity": -1
                    } });
            }
            if (!product) {
                res.status(404).json({
                    message: "Product not found!",
                    status: 404
                });
                return;
            }
            const user = await users_model_1.default.findOne({ _id: req.user?.id }).populate("cart.product");
            if (!user) {
                return res.status(404).json({
                    message: "User not found",
                    status: 404
                });
            }
            res.status(200).json({
                message: "quanitity updated!",
                cart: user.cart,
                status: 200
            });
        }
        catch (error) {
            res.status(500).json((0, errorFunction_1.default)(error));
        }
    }
};
