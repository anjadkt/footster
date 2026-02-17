import { UserJwt } from "./user.type";

declare global {
  namespace Express {
    interface Request {
      user?: UserJwt;
    }
  }
}

export {}
