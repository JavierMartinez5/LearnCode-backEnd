import { IsDefined, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateSectionDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  public tutorialId: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  public sectionId: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  public sectionTitle: string;

  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  public position: number;
}
