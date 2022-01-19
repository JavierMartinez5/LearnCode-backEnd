
import { IsString, IsNotEmpty, IsDefined, IsNumber } from 'class-validator';

export class CreateSectionDto {

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    public sectionTitle: string

    @IsNumber()
    @IsNotEmpty()
    @IsDefined()
    public position: number
}