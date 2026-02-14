"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("../config/dotenv"));
exports.default = (req, res, next) => {
    try {
        const token = req.cookies.token || req.cookies.Admin_token;
        if (token) {
            const decoded = jsonwebtoken_1.default.verify(token, (0, dotenv_1.default)("SECRET_KEY"));
            if (!decoded)
                return res.status(401).json({ message: "token invalid!", status: 401 });
            req.user = decoded;
            next();
        }
        else {
            return res.status(401).json({ message: "token expired!", status: 401 });
        }
    }
    catch (error) {
        res.status(500).json("server error");
    }
};
