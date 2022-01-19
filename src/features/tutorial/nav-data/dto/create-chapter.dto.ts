
import { IsString, IsNotEmpty, IsDefined, IsNumber } from 'class-validator';

export class CreateChapterDto {

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    public chapterTitle: string

    @IsNumber()
    @IsNotEmpty()
    @IsDefined()
    public position: number
}