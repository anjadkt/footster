"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const adminSchema = new mongoose_1.Schema({
    name: {
        type: String,
        require: true
    },
    role: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true,
    },
    password: {
        type: String,
        require: true
    }
});
exports.default = (0, mongoose_1.model)("Admin", adminSchema);
