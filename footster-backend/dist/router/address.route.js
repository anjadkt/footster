"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adress_controller_1 = __importDefault(require("../controller/adress.controller"));
const router = express_1.default.Router();
router.post('/', adress_controller_1.default.addAddress);
router.get('/', adress_controller_1.default.getAddress);
exports.default = router;
