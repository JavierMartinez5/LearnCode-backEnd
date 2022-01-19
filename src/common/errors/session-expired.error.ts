import { HttpException } from '@nestjs/common';
import { Messages } from '../consts';

export class SessionExpiredError extends HttpException {
  constructor(code: number = 401) {
    super(Messages.sessionExpired, code);
  }
}
