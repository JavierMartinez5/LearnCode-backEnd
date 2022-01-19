import { HttpException } from '@nestjs/common';
import { Messages } from '../consts';

export class InvalidIdError extends HttpException {
  constructor(code: number = 400) {
    super(Messages.invalidId, code);
  }
}
