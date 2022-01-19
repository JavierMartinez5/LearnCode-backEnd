import { IsDefined, IsNotEmpty, IsString } from "class-validator";

export class CreateTutorialNameDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  public tutorialName: string;
}
