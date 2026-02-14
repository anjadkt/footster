"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_model_1 = __importDefault(require("../model/users.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validator_1 = __importDefault(require("validator"));
const dotenv_1 = __importDefault(require("../config/dotenv"));
const errorFunction_1 = __importDefault(require("../types/errorFunction"));
exports.default = {
    userRegister: async (req, res) => {
        try {
            const { email, password, name } = req.body;
            if (!email || !password || !name)
                return res.status(406).json({ message: "invalid format!", status: 406 });
            if (!validator_1.default.isEmail(email))
                return res.status(406).json({ message: "invalid email format!", status: 406 });
            const exist = await users_model_1.default.findOne({ email });
            if (exist)
                return res.status(409).json({ message: "User already Exist!", status: 409 });
            const hash = await bcrypt_1.default.hash(password, 10); //make more strong !
            const user = await users_model_1.default.create({
                email,
                name,
                password: hash,
                address: {},
                role: "user",
                login: false,
            });
            res.status(200).json({
                message: "User registered Successfully!",
                status: 200
            });
        }
        catch (error) {
            res.status(500).json((0, errorFunction_1.default)(error));
        }
    },
    userLogin: async (req, res) => {
        try {
            const { email, password } = req.body;
            console.log(req.body);
            if (!email.trim() || !password.trim())
                return res.status(406).json({ message: "invalid format", status: 406 });
            const user = await users_model_1.default.findOne({ email });
            if (!user)
                return res.status(404).json({ message: "User Not Found!", status: 404 });
            if (user.status === "Blocked")
                return res.status(403).json({ message: "User is Blocked", status: 403 });
            const isValidPass = await bcrypt_1.default.compare(password, user.password);
            if (!isValidPass)
                return res.status(401).json({ message: "Invalid Password!", status: 401 });
            const TOKEN = jsonwebtoken_1.default.sign({ email, name: user.name, id: user._id, role: user.role }, (0, dotenv_1.default)("SECRET_KEY"), { expiresIn: "2h" });
            res.cookie((user.role === "admin" ? "Admin_token" : "token"), TOKEN, {
                maxAge: 1000 * 60 * 60 * 2,
                httpOnly: true,
                secure: true,
                sameSite: "none",
                partitioned: true
            });
            user.login = true;
            await user.save();
            res.status(200).json({ message: "User login successfull!", token: TOKEN, status: 200, name: user.name, role: user.role });
        }
        catch (error) {
            res.status(500).json((0, errorFunction_1.default)(error));
        }
    },
    userLogout: async (req, res) => {
        try {
            res.status;
            const id = req.user.id;
            const user = await users_model_1.default.findOne({ _id: id });
            if (!user)
                return res.status(404).json({ message: "User Not Found!", status: 404 });
            user.login = false;
            await user.save();
            res.clearCookie((user.role === "admin" ? "Admin_token" : 'token'), {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                partitioned: true
            });
            res.status(200).json({
                message: "Logout Successfull",
                status: 200
            });
        }
        catch (error) {
            res.status(500).json((0, errorFunction_1.default)(error));
        }
    }
};
