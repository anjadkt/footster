"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cart_controller_1 = __importDefault(require("../controller/cart.controller"));
const router = express_1.default.Router();
router.get('/', cart_controller_1.default.getCart);
router.post('/', cart_controller_1.default.addToCart);
router.put('/', cart_controller_1.default.removeItem);
router.post('/:action', cart_controller_1.default.incOrDec);
exports.default = router;
