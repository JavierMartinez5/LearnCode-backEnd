import { Controller } from '@nestjs/common';
import { TheoryService } from './theory.service';

@Controller('theory')
export class TheoryController {
  constructor(private readonly theoryService: TheoryService) {}
}
