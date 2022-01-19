import { HttpException } from '@nestjs/common';
import { Messages } from '../consts';

export class TutorialDoesNotExistError extends HttpException {
  constructor(code: number = 404) {
    super(Messages.tutorialDoesNotExist, code);
  }
}
