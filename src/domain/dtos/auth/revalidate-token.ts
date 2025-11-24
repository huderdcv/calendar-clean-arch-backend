export class RevalidateTokenDto {
  private constructor(public id: string, public name: string) {}

  static create(object: {
    [key: string]: any;
  }): [string?, RevalidateTokenDto?] {
    const { id, name } = object;
    if (!id) return ['User ID is required'];
    if (!name) return ['User name is required'];
    return [undefined, new RevalidateTokenDto(id, name)];
  }
}
