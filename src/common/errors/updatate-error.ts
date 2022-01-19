import { HttpException } from '@nestjs/common';
import { Messages } from '../consts';

export class UpdateError extends HttpException {
  constructor(code: number = 500) {
    super(Messages.updateError, code);
  }
}
