import { UserModel } from '../data/models/index.ts';

declare global {
  namespace Express {
    interface Request {
      // This adds 'user' to EVERY req object in your app
      user?: InstanceType<typeof UserModel>;
    }
  }
}
