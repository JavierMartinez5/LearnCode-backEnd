import { HttpException } from '@nestjs/common';
import { Messages } from '../consts';

export class EmailExistsError extends HttpException {
  constructor(code: number) {
    super(Messages.emailExists, code);
  }
}
