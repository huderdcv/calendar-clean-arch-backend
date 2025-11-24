export class PaginationDto {
  constructor(public page: number = 1, public limit: number = 10) {}

  static create(object: { [key: string]: any }): [string?, PaginationDto?] {
    const page = Number(object.page) || 1;
    const limit = Number(object.limit) || 10;

    if (!Number.isInteger(page)) return ['Page must be an integer'];
    if (!Number.isInteger(limit)) return ['Limit must be an integer'];

    if (page < 1 || limit < 11)
      return ['Page and limit must be greater than 0'];

    return [undefined, new PaginationDto(page, limit)];
  }
}
