import { Router } from 'express';
import { AuthController } from './controller.js';
import { AuthService } from '../services/auth.service.js';

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const authService = new AuthService();
    const authController = new AuthController(authService);

    router.post('/new', authController.createUser);
    router.post('/', authController.loginUser);
    router.get('/renew', authController.revalidateToken);

    return router;
  }
}
