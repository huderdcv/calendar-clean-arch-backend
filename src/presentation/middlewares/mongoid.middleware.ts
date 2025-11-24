import { NextFunction, Request, Response } from 'express';
import { validators } from '../../config/index.js';

export class MongoidMiddleware {
  static verifyEventId(req: Request, res: Response, next: NextFunction) {
    const eventId = req.params.id;
    if (!eventId)
      return res
        .status(400)
        .json({ ok: false, error: 'ID parameter is missing' });

    if (!validators.idValidId(eventId))
      return res.status(400).json({
        ok: false,
        error: 'Invalid ID format',
      });

    next();
  }
}
