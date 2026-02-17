"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorFunction_1 = __importDefault(require("../types/errorFunction"));
exports.default = (req, res, next) => {
    try {
        const role = req.user?.role;
        if (role !== "admin")
            return res.status(401).json({ message: "Unauthorized Route!", status: 401 });
        next();
    }
    catch (error) {
        res.status(500).json((0, errorFunction_1.default)(error));
    }
};
