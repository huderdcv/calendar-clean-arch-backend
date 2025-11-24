import { NextFunction, Request, Response } from 'express';
import { UserModel } from '../../data/models/index.js';
import { jwtAdapter } from '../../config/jwt.adapter.js';

export class AuthMiddleware {
  constructor() {}

  static async validateToken(req: Request, res: Response, next: NextFunction) {
    // general validation
    const authorization = req.header('Authorization');
    if (!authorization)
      return res.status(401).json({ error: 'No token provided' });

    if (!authorization.startsWith('Bearer '))
      return res.status(401).json({ error: 'No Token Bearer provided' });

    const token = authorization.split(' ').at(1) || '';

    try {
      // validating if token is valid
      const payload = await jwtAdapter.verify<{ uid: string; name: string }>(
        token
      );
      if (!payload) return res.status(401).json({ error: 'Invalid token' });

      // getting user
      const user = await UserModel.findById(payload.uid);
      if (!user) return res.status(500).json({ error: 'Invalid token - user' });

      // add user in the body
      req.user = user;

      next();
    } catch (error) {
      console.log(error);
      return res.status(500).json('Internal server error');
    }
  }
}
