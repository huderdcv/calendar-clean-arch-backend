import { regExp } from '../../../config/reg-exp.js';

export class CreateUserDto {
  private constructor(
    public name: string,
    public email: string,
    public password: string
  ) {}
  static create(object: { [key: string]: any }): [string?, CreateUserDto?] {
    const { name, email, password } = object;
    if (!name) return ['Name is required'];
    if (!email) return ['Email is required'];
    if (!regExp.isEmail.test(email)) return ['Invalid email format'];
    if (!password) return ['Password is required'];
    if ((password as string).length < 6) return ['Password too short'];
    return [undefined, new CreateUserDto(name, email, password)];
  }
}
