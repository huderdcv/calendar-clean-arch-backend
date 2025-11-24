import { Request, Response } from 'express';
import { CreateEventDto, UpdateEventDto } from '../../domain/index.js';
import { CustomError } from '../../domain/errors/index.js';
import { EventService } from '../services/index.js';

export class EventController {
  constructor(private eventService: EventService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res
        .status(error.statusCode)
        .json({ ok: false, error: error.message });
    }
    console.log(error);
    res.status(500).json({ ok: false, error: 'Internal server error' });
  };

  getEvents = async (req: Request, res: Response) => {
    // TODO: add logic to sent pagination or not according to the users
    try {
      const events = await this.eventService.getEvents();
      return res.json(events);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  createEvent = async (req: Request, res: Response) => {
    // dtos
    const [error, createEventDto] = CreateEventDto.create({
      ...req.body,
      user: req.user?.id,
    });
    if (error) return res.status(400).json({ ok: false, error });

    // service
    try {
      const answer = await this.eventService.createEvent(createEventDto!);
      res.json(answer);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  updateEvent = async (req: Request, res: Response) => {
    // getting the id event
    const eventId = req.params.id;

    // getting the id user
    const userId = req.user?.id;

    // getting the dto body
    const [error, updateEventDto] = UpdateEventDto.create(req.body);
    if (error) return res.status(400).json({ ok: false, error });

    // service
    try {
      const event = await this.eventService.updateEvent(
        eventId,
        updateEventDto!,
        userId
      );
      res.json(event);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  deleteEvent = async (req: Request, res: Response) => {
    // gatther necesary data
    const eventId = req.params.id;
    const userId = req.user?.id;

    //service
    try {
      const deletedEvent = await this.eventService.deleteEvent(eventId, userId);
      res.json(deletedEvent);
    } catch (error) {
      this.handleError(error, res);
    }
  };
}
