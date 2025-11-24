import { dateAdapter, validators } from '../../../config/index.js';

export class CreateEventDto {
  private constructor(
    public title: string,
    public notes: string,
    public start: Date,
    public end: Date,
    public user: string //user-id
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateEventDto?] {
    const { title, notes, start, end, user, userId } = object;
    const idToUser = user || userId;
    const startDate = dateAdapter.toDate(start);
    const endDate = dateAdapter.toDate(end);

    if (!title) return ['Title is required'];
    if (!start) return ['Start date is required'];
    if (!dateAdapter.isValid(start)) return ['Invalid date start'];
    if (!end) return ['Start date is required'];
    if (!dateAdapter.isValid(end)) return ['Invalid date end'];
    if (endDate <= startDate) return ['End date must be after start date'];
    if (!idToUser) return ['User ID is required'];
    if (!validators.idValidId(idToUser)) return ['Invalid user Id'];

    return [
      undefined,
      new CreateEventDto(title, notes, startDate, endDate, idToUser),
    ];
  }
}
