"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const aUsers_controller_1 = __importDefault(require("../../controller/admin/aUsers.controller"));
const router = express_1.default.Router();
router.get('/', aUsers_controller_1.default.getUserDetails);
router.get('/all', aUsers_controller_1.default.getAllUsers);
router.get('/:id', aUsers_controller_1.default.getSingleUser);
router.put('/updateStatus', aUsers_controller_1.default.changeOrderStatus);
router.get('/:id/block', aUsers_controller_1.default.blockUser);
exports.default = router;
