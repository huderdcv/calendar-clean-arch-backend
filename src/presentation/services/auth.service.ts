import { bcryptAdapter } from '../../config/bcryptjs.adapter.js';
import { jwtAdapter } from '../../config/jwt.adapter.js';
import { UserModel } from '../../data/models/user.model.js';
import { CustomError } from '../../domain/errors/index.js';
import { CreateUserDto } from '../../domain/index.js';

export class AuthService {
  constructor() {}

  async createUser(createUserDto: CreateUserDto) {
    // validate if user doesn't exist
    const existUser = await UserModel.findOne({
      email: createUserDto.email,
    });
    if (existUser) throw CustomError.badRequest('User already exists');
    try {
      // create user, hash password and save
      const user = new UserModel(createUserDto);
      user.password = bcryptAdapter.hash(createUserDto.password);
      await user.save();

      // generate token
      const token = await jwtAdapter.generate<{ uid: string; name: string }>({
        uid: user.id,
        name: user.name,
      });
      if (!token) throw CustomError.internalServer('Error generating token');

      //TODO: send email to validate with token

      // answer
      return {
        ok: true,
        uid: user.id,
        name: user.name,
        token,
      };
    } catch (error) {
      throw CustomError.internalServer();
    }
  }
}
