import { NextFunction, Request, Response } from 'express';
import { UserModel } from '../../data/models/index.js';
import { jwtAdapter } from '../../config/jwt.adapter.js';

export class AuthMiddleware {
  constructor() {}

  static async validateToken(req: Request, res: Response, next: NextFunction) {
    // general validation
    const authorization = req.header('Authorization');
    if (!authorization)
      return res.status(401).json({ ok: false, error: 'No token provided' });

    if (!authorization.startsWith('Bearer '))
      return res
        .status(401)
        .json({ ok: false, error: 'No Token Bearer provided' });

    const token = authorization.split(' ').at(1) || '';

    try {
      // validating if token is valid
      const payload = await jwtAdapter.verify<{ uid: string; name: string }>(
        token
      );
      if (!payload)
        return res.status(401).json({ ok: false, error: 'Invalid token' });

      // getting user
      const user = await UserModel.findById(payload.uid);
      if (!user)
        return res
          .status(401)
          .json({ ok: false, error: 'Invalid token - user' });

      //TODO: FIX 2: Check if user is active (Security Best Practice)
      // Assuming your model has an 'isActive' or 'status' field
      // if (!user.isActive) return res.status(401).json({ error: 'User is inactive' });

      // add user in the
      req.user = user;

      next();
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ ok: false, error: 'Internal server error' });
    }
  }
}
