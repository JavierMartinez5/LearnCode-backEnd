import { HttpException } from '@nestjs/common';
import { Messages } from '../consts';

export class UnableRefreshTokenError extends HttpException {
  constructor(code: number = 500) {
    super(Messages.unableRefreshToken, code);
  }
}
