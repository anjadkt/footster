"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    isFav: Boolean,
    reviews: Array,
    img: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    rating: Number,
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    }
}, {
    collection: "products"
});
const Product = (0, mongoose_1.model)("Product", productSchema);
exports.default = Product;
