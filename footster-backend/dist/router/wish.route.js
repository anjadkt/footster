"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const wishlist_controller_1 = __importDefault(require("../controller/wishlist.controller"));
const router = express_1.default.Router();
router.get('/', wishlist_controller_1.default.showList);
router.post('/', wishlist_controller_1.default.addOrDltFav);
router.get('/favorite', wishlist_controller_1.default.getFavProducts);
exports.default = router;
