import { HttpException } from '@nestjs/common';
import { Messages } from '../consts';

export class InappropriateRoleError extends HttpException {
  constructor(code: number = 403) {
    super(Messages.inappropriateRoleError, code);
  }
}
