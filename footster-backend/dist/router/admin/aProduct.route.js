"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_controller_1 = __importDefault(require("../../controller/products.controller"));
const aProduct_controller_1 = __importDefault(require("../../controller/admin/aProduct.controller"));
const router = express_1.default.Router();
router.get('/all', products_controller_1.default.getAllProducts);
router.post('/add', aProduct_controller_1.default.addProduct);
router.put('/remove', aProduct_controller_1.default.removeProduct);
router.put('/update', aProduct_controller_1.default.updateProduct);
router.get('/:id', products_controller_1.default.getOneProduct);
exports.default = router;
