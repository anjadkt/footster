export type {UserJwt} from './user'

declare global {
  namespace Express {
    interface Request {
      user?: UserJwt;
    }
  }
}

export {}