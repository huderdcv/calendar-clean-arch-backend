import jwt from 'jsonwebtoken';
import { envs } from './envs.js';

const JWT_SECRET_KEY = envs.JWT_SECRET_KEY;

export const jwtAdapter = {
  generate<T extends object>(
    payload: T,
    duration: string = '2h'
  ): Promise<string | null> {
    return new Promise((resolve) => {
      jwt.sign(
        payload,
        JWT_SECRET_KEY,
        { expiresIn: duration as any },
        (err, token) => {
          if (err) return resolve(null);
          return resolve(token as string);
        }
      );
    });
  },
  verify<T>(token: string): Promise<T | null> {
    return new Promise((resolve) => {
      jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
        if (err) return resolve(null);
        return resolve(decoded as T);
      });
    });
  },
};
