"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const aOrder_controller_1 = __importDefault(require("../../controller/admin/aOrder.controller"));
const router = express_1.default.Router();
router.get('/all', aOrder_controller_1.default.getAllOrders);
router.post('/status', aOrder_controller_1.default.changeStatus);
exports.default = router;
