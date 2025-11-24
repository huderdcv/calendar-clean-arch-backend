import { Router } from 'express';
import { EventController } from './controller.js';
import { AuthMiddleware } from '../middlewares/auth.middleware.js';
import { EventService } from '../services/event.service.js';
import { MongoidMiddleware } from '../middlewares/mongoid.middleware.js';

export class EventRoutes {
  static get routes(): Router {
    const router = Router();
    const eventService = new EventService();
    const eventController = new EventController(eventService);

    router.get('/', [AuthMiddleware.validateToken], eventController.getEvents);
    router.post(
      '/',
      [AuthMiddleware.validateToken],
      eventController.createEvent
    );
    router.put(
      '/:id',
      [AuthMiddleware.validateToken, MongoidMiddleware.verifyEventId],
      eventController.updateEvent
    );
    router.delete(
      '/:id',
      [AuthMiddleware.validateToken],
      eventController.deleteEvent
    );

    return router;
  }
}
