"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
exports.default = (0, express_rate_limit_1.default)({
    windowMs: 1000 * 60 * 1,
    max: 5,
    message: {
        status: 429,
        message: "Too Many Requests!"
    },
    standardHeaders: true
});
