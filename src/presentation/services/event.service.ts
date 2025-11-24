import { EventModel } from '../../data/models/event.model.js';
import { CustomError } from '../../domain/errors/custom.error.js';
import {
  CreateEventDto,
  PaginationDto,
  UpdateEventDto,
} from '../../domain/index.js';

export class EventService {
  constructor() {}

  async createEvent(createEventDto: CreateEventDto) {
    const eventExist = await EventModel.findOne({
      title: createEventDto.title,
    });
    if (eventExist)
      throw CustomError.badRequest('Event with this title already exists');

    try {
      const newEvent = new EventModel(createEventDto);
      await newEvent.save();
      return newEvent;
    } catch (error) {
      console.log('mel 2');
      throw CustomError.internalServer();
    }
  }

  async updateEvent(
    eventId: string,
    updateEventDto: UpdateEventDto,
    userId: string
  ) {
    // some validation
    const eventExists = await EventModel.findById(eventId);
    if (!eventExists) throw CustomError.notFound('Event not found');

    if (userId !== eventExists.user._id.toString())
      throw CustomError.unauthorized('You are not allowed to edit this event');

    try {
      const updatedEvent = await EventModel.findByIdAndUpdate(
        eventId,
        updateEventDto.values,
        { new: true }
      );
      return {
        ok: true,
        event: updatedEvent,
      };
    } catch (error) {
      throw CustomError.internalServer();
    }
  }

  async getEvents(paginationDto?: PaginationDto) {
    try {
      const events = await EventModel.find().populate('user', 'name');
      return {
        ok: true,
        events,
      };
    } catch (error) {
      throw CustomError.internalServer();
    }
  }
}
