import { PartialType } from '@nestjs/mapped-types';
import { CreateTutorialNameDto } from './create-tutorial-name.dto';

export class UpdateTutorialNameDto extends PartialType(CreateTutorialNameDto) {}
