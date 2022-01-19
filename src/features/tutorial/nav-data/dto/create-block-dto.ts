
import {IsNotEmpty, IsDefined } from 'class-validator';
import { CreateChapterDto } from './create-chapter.dto';
import { CreateSectionDto } from './create-section.dto';

export class CreateBlockDto {
    @IsDefined()
    @IsNotEmpty()
    public section: CreateSectionDto

    @IsDefined()
    public chapters: CreateChapterDto[]

}