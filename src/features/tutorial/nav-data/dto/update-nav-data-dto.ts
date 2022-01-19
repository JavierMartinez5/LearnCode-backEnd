import { IsDefined, IsNotEmpty } from 'class-validator';
import { UpdateBlockDto } from './update-block-dto';

export class UpdateNavDataDto {
  @IsDefined()
  @IsNotEmpty()
  public tutorialId: string;

  @IsNotEmpty()
  @IsDefined()
  public data: UpdateBlockDto;
}
