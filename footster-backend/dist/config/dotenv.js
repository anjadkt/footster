"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function getEnv(env) {
    if (!process.env[env]) {
        throw new Error("Env not found!");
    }
    return process.env[env];
}
exports.default = getEnv;
