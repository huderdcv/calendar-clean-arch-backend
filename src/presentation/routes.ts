import { Request, Response, Router } from 'express';
import { AuthRoutes } from './auth/routes.js';
import { EventRoutes } from './event/routes.js';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/api/auth', AuthRoutes.routes);
    router.use('/api/events', EventRoutes.routes);

    return router;
  }
}
