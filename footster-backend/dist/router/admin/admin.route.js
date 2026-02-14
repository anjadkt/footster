"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_controller_1 = __importDefault(require("../../controller/admin/admin.controller"));
const users_controller_1 = __importDefault(require("../../controller/users.controller"));
const verifyToken_1 = __importDefault(require("../../middleware/verifyToken"));
const router = express_1.default.Router();
router.post('/register', admin_controller_1.default.adminRegister);
router.get('/logout', verifyToken_1.default, users_controller_1.default.userLogout);
exports.default = router;
