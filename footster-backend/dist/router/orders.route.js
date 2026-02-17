"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orders_controller_1 = __importDefault(require("../controller/orders.controller"));
const router = express_1.default.Router();
router.post('/', orders_controller_1.default.addUserOrders);
router.get('/all', orders_controller_1.default.getUserOrders);
router.get('/:id', orders_controller_1.default.getAOrder);
exports.default = router;
