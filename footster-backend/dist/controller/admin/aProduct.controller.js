"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_model_1 = __importDefault(require("../../model/products.model"));
const errorFunction_1 = __importDefault(require("../../types/errorFunction"));
exports.default = {
    addProduct: async (req, res) => {
        try {
            const { img, category, name, price } = req.body;
            if (!category || !name || !price || !img)
                return res.status(400).json({ message: "incomplete form!", status: 400 });
            const product = await products_model_1.default.create({
                isFav: false,
                reviews: [],
                img,
                category,
                rating: 2.0,
                name,
                price
            });
            res.status(200).json({
                message: "product added successfully!",
                status: 200,
                product
            });
        }
        catch (error) {
            res.status(500).json((0, errorFunction_1.default)(error));
        }
    },
    removeProduct: async (req, res) => {
        try {
            const { id } = req.body;
            const product = await products_model_1.default.findOne({ _id: id });
            if (!product)
                res.status(404).json({ message: "Product not found!", status: 404 });
            const deletedProduct = await products_model_1.default.deleteOne({ _id: id });
            res.status(200).json({
                message: "Product removed!",
                status: 200,
                deletedProduct
            });
        }
        catch (error) {
            res.status(500).json((0, errorFunction_1.default)(error));
        }
    },
    updateProduct: async (req, res) => {
        try {
            const { id, img, category, price, name } = req.body;
            if (!id || !img || !category || !price || !name)
                return res.status(400).json({ message: "incomplete form!", status: 400 });
            const updatedProduct = await products_model_1.default.updateOne({ _id: id }, {
                name,
                category,
                price,
                img
            });
            res.status(200).json({
                message: "Product Updated!",
                updatedProduct,
                status: 200
            });
        }
        catch (error) {
            res.status(500).json((0, errorFunction_1.default)(error));
        }
    },
    getOneProduct: async (req, res) => {
        try {
            const { id } = req.params;
            const product = await products_model_1.default.findOne({ _id: id });
            if (!product)
                res.status(404).json({ message: "Product not found!", status: 404 });
            res.status(200).json(product);
        }
        catch (error) {
            res.status(500).json((0, errorFunction_1.default)(error));
        }
    }
};
