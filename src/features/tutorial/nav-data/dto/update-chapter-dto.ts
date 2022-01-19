import { PartialType } from '@nestjs/mapped-types';
import { IsDefined, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateChapterDto } from './create-chapter.dto';

export class UpdateChapterDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  public sectionId: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  public chapterId: string;

  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  public position: number;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  public chapterTitle: string;
}
