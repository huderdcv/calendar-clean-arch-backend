import { dateAdapter, validators } from '../../../config/index.js';

export class UpdateEventDto {
  private constructor(
    public title?: string,
    public notes?: string,
    public start?: Date,
    public end?: Date
  ) {}

  get values() {
    const returnObj: { [key: string]: any } = {};
    if (this.title !== undefined) returnObj.title = this.title;
    if (this.notes !== undefined) returnObj.notes = this.notes;
    if (this.start) returnObj.start = this.start;
    if (this.end) returnObj.end = this.end;
    return returnObj;
  }

  static create(object: { [key: string]: any }): [string?, UpdateEventDto?] {
    const { title, notes, start, end } = object;
    let startDate: Date | undefined;
    let endDate: Date | undefined;

    if (start) {
      if (!dateAdapter.isValid(start)) return ['Invalid date start'];
      startDate = dateAdapter.toDate(start);
    }

    if (end) {
      if (!dateAdapter.isValid(end)) return ['Invalid date end'];
      endDate = dateAdapter.toDate(end);
    }

    if (start && end) {
      if (dateAdapter.toDate(end) <= dateAdapter.toDate(start))
        return ['End date must be after start date'];
    }

    return [undefined, new UpdateEventDto(title, notes, startDate, endDate)];
  }
}
