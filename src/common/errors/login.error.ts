import { HttpException } from '@nestjs/common';
import { Messages } from '../consts';

export class InvalidEmailOrPasswordError extends HttpException {
  constructor(code: number = 401) {
    super(Messages.invalidEmailOrPassword, code);
  }
}
