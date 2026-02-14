"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = void 0;
const mongoose_1 = require("mongoose");
const addressSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    number: {
        type: String,
        maxlength: 10,
        minlength: 10
    },
    pincode: {
        type: String,
        maxlength: 6,
        minlength: 6
    },
    city: String,
    address: String,
    state: String,
    country: String
});
exports.Address = (0, mongoose_1.model)("Address", addressSchema);
