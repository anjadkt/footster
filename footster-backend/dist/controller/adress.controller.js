"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_model_1 = __importDefault(require("../model/users.model"));
const errorFunction_1 = __importDefault(require("../types/errorFunction"));
exports.default = {
    addAddress: async (req, res) => {
        try {
            const id = req.user.id;
            const { name, number, pincode, city, adres, state, country } = req.body;
            if (!name || !number || !pincode || !city || !adres || !state || !country) {
                return res.status(400).json({ message: "invalid form!", status: 400 });
            }
            const user = await users_model_1.default.updateOne({ _id: id }, {
                $set: {
                    "address.name": name,
                    "address.number": number,
                    "address.pincode": pincode,
                    "address.city": city,
                    "address.adres": adres,
                    "address.state": state,
                    "address.country": country
                }
            });
            res.status(200).json({
                message: "address added successfully!",
                address: user
            });
        }
        catch (error) {
            res.status(500).json((0, errorFunction_1.default)(error));
        }
    },
    getAddress: async (req, res) => {
        try {
            const id = req.user.id;
            const user = await users_model_1.default.findOne({ _id: id });
            if (!user) {
                return res.status(404).json({ message: "User not found", status: 404 });
            }
            if (user.address) {
                return res.status(200).json({
                    address: user.address,
                    message: "address available!",
                    status: 200
                });
            }
            else {
                return res.status(404).json({
                    message: "address not found!",
                    status: 200
                });
            }
        }
        catch (error) {
            res.status(500).json((0, errorFunction_1.default)(error));
        }
    }
};
