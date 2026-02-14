"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_model_1 = __importDefault(require("../model/users.model"));
const errorFunction_1 = __importDefault(require("../types/errorFunction"));
exports.default = async (req, res, next) => {
    try {
        const { id } = req.user;
        const user = await users_model_1.default.findOne({ _id: id });
        if (!user)
            return res.status(404).json({ message: "no user found!", status: 404 });
        if (user.status === "Blocked")
            return res.status(403).json({ message: "User is Blocked!", status: 403 });
        next();
    }
    catch (error) {
        res.status(500).json((0, errorFunction_1.default)(error));
    }
};
