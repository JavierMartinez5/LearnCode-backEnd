import { HttpException } from '@nestjs/common';
import { Messages } from '../consts';

export class InvalidTokenError extends HttpException {
  constructor(code: number = 401) {
    super(Messages.invalidToken, code);
  }
}
