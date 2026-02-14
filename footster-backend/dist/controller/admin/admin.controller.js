"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_model_1 = __importDefault(require("../../model/users.model"));
const validator_1 = __importDefault(require("validator"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const errorFunction_1 = __importDefault(require("../../types/errorFunction"));
exports.default = {
    adminRegister: async (req, res) => {
        try {
            const { email, password, name } = req.body;
            if (!email || !password || !name)
                return res.status(406).json({ message: "invalid format!", status: 406 });
            if (!validator_1.default.isEmail(email))
                return res.status(406).json({ message: "invalid email format!", status: 406 });
            const exist = await users_model_1.default.findOne({ email });
            if (exist)
                return res.status(409).json({ message: "Admin already Exist!", status: 409 });
            const hash = await bcrypt_1.default.hash(password, 10); //make more strong !
            const admin = await users_model_1.default.create({
                email,
                name,
                password: hash,
                role: "admin",
                login: false,
            });
            res.json({
                message: "Admin registered Successfully!",
                status: 200
            });
        }
        catch (error) {
            res.status(500).json((0, errorFunction_1.default)(error));
        }
    }
};
