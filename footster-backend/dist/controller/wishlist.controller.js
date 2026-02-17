"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_model_1 = __importDefault(require("../model/users.model"));
const errorFunction_1 = __importDefault(require("../types/errorFunction"));
exports.default = {
    showList: async (req, res) => {
        try {
            const user = await users_model_1.default.findById(req.user?.id).populate("favorite");
            res.status(200).json({
                favorite: user?.favorite,
                message: "favorite list send!",
                status: 200
            });
        }
        catch (error) {
            res.status(500).json((0, errorFunction_1.default)(error));
        }
    },
    addOrDltFav: async (req, res) => {
        try {
            const { id } = req.body;
            const exist = await users_model_1.default.findOne({ _id: req.user?.id, "favorite": id });
            if (exist) {
                await users_model_1.default.updateOne({ _id: req.user?.id }, { $pull: { favorite: id } });
                res.status(200).json({
                    message: "Product removed from wishList",
                    status: 200,
                    favorite: false
                });
                return;
            }
            await users_model_1.default.findByIdAndUpdate(req.user?.id, { $push: {
                    favorite: id
                } });
            res.status(200).json({
                message: "product added to wishlist!",
                status: 200,
                favorite: true
            });
        }
        catch (error) {
            res.status(500).json((0, errorFunction_1.default)(error));
        }
    },
    removeFav: async (req, res) => {
        try {
            const { id } = req.body;
            const user = await users_model_1.default.findById(req.user?.id);
            if (!user)
                return res.status(404).json({ message: "User not found!", status: 404 });
            const newFav = user.favorite.filter((p) => p.toString() !== id);
            if (newFav.length === user.favorite.length)
                return res.status(404).json({ message: "no Product found", status: 404 });
            user.favorite = newFav;
            await user.save();
            res.status(200).json({
                message: "Product removed from wishList",
                status: 200
            });
        }
        catch (error) {
            res.status(500).json((0, errorFunction_1.default)(error));
        }
    },
    getFavProducts: async (req, res) => {
        try {
            const id = req.user?.id;
            const user = await users_model_1.default.findOne({ _id: id });
            if (!user)
                return res.status(404).json({ message: "User not found!", status: 404 });
            res.status(200).json({
                favorite: user.favorite,
                message: "User Favorite List",
                status: 200
            });
        }
        catch (error) {
            res.status(500).json((0, errorFunction_1.default)(error));
        }
    }
};
