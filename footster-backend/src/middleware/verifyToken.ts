import jwt from "jsonwebtoken";
import getEnv from "../config/dot";
import { Request, Response, NextFunction } from "express";
import type { UserJwt } from "../types";

export default function auth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies?.token || req.cookies?.Admin_token;

  if (!token) {
    return res.status(401).json({
      message: "token expired!",
      status: 401,
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      getEnv("SECRET_KEY")
    ) as UserJwt;

    req.user = decoded;

    next();
  } catch {
    return res.status(401).json({
      message: "token invalid!",
      status: 401,
    });
  }
}
