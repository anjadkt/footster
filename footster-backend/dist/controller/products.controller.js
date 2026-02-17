"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_model_1 = __importDefault(require("../model/products.model"));
const errorFunction_1 = __importDefault(require("../types/errorFunction"));
exports.default = {
    getAllProducts: async (req, res) => {
        if (req.query.category) {
            try {
                const { category } = req.query;
                const products = await products_model_1.default.find({ category });
                return res.status(200).json(products);
            }
            catch (error) {
                res.status(500).json((0, errorFunction_1.default)(error));
            }
        }
        if (Object.keys(req.query).length > 0) {
            const { _page, _limit } = req.query;
            const limit = Number(_limit);
            const page = ((Number(_page) - 1) * limit);
            try {
                const products = await products_model_1.default.aggregate([
                    { $skip: page },
                    { $limit: limit }
                ]);
                res.json(products);
            }
            catch (error) {
                res.status(500).json((0, errorFunction_1.default)(error));
            }
        }
        else {
            const products = await products_model_1.default.find();
            res.json(products);
        }
    },
    getOneProduct: async (req, res) => {
        try {
            const id = req.params.id;
            const product = await products_model_1.default.find({ _id: id });
            if (product.length > 0)
                return res.status(200).json(product);
            else
                return res.status(404).json({ message: "Product not found!", status: 404 });
        }
        catch (error) {
            res.status(500).json((0, errorFunction_1.default)(error));
        }
    }
};
