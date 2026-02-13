import User from "../model/users.model";
import { Request, Response } from "express";
import { Types } from "mongoose";
import errorFunction from "../types/errorFunction";
import {AddToCartBody, RemoveItemBody } from "../types/cart.types";

export default {

  // ================= ADD TO CART =================
  addToCart: async (
    req: Request<{}, {}, AddToCartBody>,
    res: Response
  ): Promise<Response> => {
    try {
      const userId = req.user?.id;
      const { id: productId, quantity = 1 } = req.body;

      if (!productId) {
        return res.status(400).json({
          message: "Product id is required!",
          status: 400,
        });
      }

      if (!Types.ObjectId.isValid(productId)) {
        return res.status(400).json({
          message: "Invalid product id!",
          status: 400,
        });
      }

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({
          message: "User not found!",
          status: 404,
        });
      }

      const existingItem = user.cart.find(
        item => item.product?.toString() === productId
      );

      if (existingItem) {
        existingItem.quantity += Number(quantity);
      } else {
        user.cart.push({
          product: new Types.ObjectId(productId),
          quantity: Number(quantity) || 1,
        });
      }

      await user.save();
      await user.populate("cart.product");

      return res.status(200).json({
        cart: user.cart,
        message: "Item added successfully!",
        status: 200,
      });

    } catch (error) {
      return res.status(500).json(errorFunction(error));
    }
  },

  // ================= GET CART =================
  getCart: async (req: Request, res: Response): Promise<Response> => {
    try {
      const user = await User.findById(req.user?.id)
        .populate("cart.product")
        .select("cart name");

      if (!user) {
        return res.status(404).json({
          message: "User not found!",
          status: 404,
        });
      }

      return res.status(200).json({
        cart: user.cart,
        name: user.name,
        message: "Cart fetch success!",
        status: 200,
      });

    } catch (error) {
      return res.status(500).json(errorFunction(error));
    }
  },

  // ================= REMOVE ITEM =================
  removeItem: async (
    req: Request<{}, {}, RemoveItemBody>,
    res: Response
  ): Promise<Response> => {
    try {
      const { id } = req.body;

      const details = await User.updateOne(
        { _id: req.user?.id },
        { $pull: { cart: { product: id } } }
      );

      if (!details.modifiedCount) {
        return res.status(404).json({
          message: "Product Not Found!",
          status: 404,
        });
      }

      const user = await User.findById(req.user?.id)
        .populate("cart.product")
        .select("cart");

      return res.status(200).json({
        message: "Product Removed!",
        status: 200,
        cart: user?.cart ?? [],
      });

    } catch (error) {
      return res.status(500).json(errorFunction(error));
    }
  },

  // ================= INC / DEC =================
  incOrDec: async (
    req: Request<{}, {}, RemoveItemBody>,
    res: Response
  ): Promise<Response> => {
    try {
      const { id } = req.body;
      const isIncrement = req.path === "/inc";

      const query = {
        _id: req.user?.id,
        "cart.product": id,
        ...(isIncrement ? {} : { "cart.quantity": { $gt: 1 } }),
      };

      const update = {
        $inc: {
          "cart.$.quantity": isIncrement ? 1 : -1,
        },
      };

      const updatedUser = await User.findOneAndUpdate(query, update, {
        new: true,
      }).select("cart");

      if (!updatedUser) {
        return res.status(404).json({
          message: "Product not found!",
          status: 404,
        });
      }

      const productObj = updatedUser.cart.find(
        item => item.product?.toString() === id
      );

      return res.status(200).json({
        message: "Quantity updated!",
        quantity: productObj?.quantity ?? 1,
        status: 200,
      });

    } catch (error) {
      return res.status(500).json(errorFunction(error));
    }
  },
};
