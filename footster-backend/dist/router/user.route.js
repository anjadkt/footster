"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_controller_1 = __importDefault(require("../controller/users.controller"));
const aUsers_controller_1 = __importDefault(require("../controller/admin/aUsers.controller"));
const verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
const rateLimitter_1 = __importDefault(require("../middleware/rateLimitter"));
const router = express_1.default.Router();
router.post('/register', rateLimitter_1.default, users_controller_1.default.userRegister);
router.post('/login', rateLimitter_1.default, users_controller_1.default.userLogin);
router.get('/login', rateLimitter_1.default, users_controller_1.default.userLogin);
router.get('/all', aUsers_controller_1.default.getAllUsers);
router.get('/details', verifyToken_1.default, aUsers_controller_1.default.getUserDetails);
router.get('/logout', verifyToken_1.default, users_controller_1.default.userLogout);
exports.default = router;
