import { regExp } from '../../../config/reg-exp.js';

export class LoginUserDto {
  private constructor(public email: string, public password: string) {}
  static create(object: { [key: string]: any }): [string?, LoginUserDto?] {
    const { email, password } = object;
    if (!email) return ['Email is required'];
    if (!regExp.isEmail.test(email)) return ['Invalid email format'];
    if (!password) return ['Password is required'];
    if ((password as string).length < 6) return ['Password too short'];
    return [undefined, new LoginUserDto(email, password)];
  }
}
