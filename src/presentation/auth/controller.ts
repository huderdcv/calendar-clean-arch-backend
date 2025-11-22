import { Request, Response } from 'express';
import { CreateUserDto } from '../../domain/index.js';
import { CustomError } from '../../domain/errors/index.js';
import { AuthService } from '../services/index.js';

export class AuthController {
  constructor(public authService: AuthService) {}

  //general
  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.log({ error });
    return res.status(500).json({ error: 'Internal server error' });
  };

  //methods
  createUser = async (req: Request, res: Response) => {
    const [error, createUserDto] = CreateUserDto.create(req.body);
    if (error) return res.status(400).json({ error });
    try {
      const user = await this.authService.createUser(createUserDto!);
      return res.json(user);
    } catch (error) {
      console.log(error);
      this.handleError(error, res);
    }
  };

  async loginUser(req: Request, res: Response) {
    res.json({
      ok: true,
    });
  }

  async revalidateToken(req: Request, res: Response) {
    res.json({
      ok: true,
    });
  }
}
