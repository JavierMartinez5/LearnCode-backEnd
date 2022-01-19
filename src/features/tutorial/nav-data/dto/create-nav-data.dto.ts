
import {IsNotEmpty, IsDefined } from 'class-validator';
import { CreateBlockDto } from './create-block-dto';

export class CreateNavDataDto {
    @IsDefined()
    @IsNotEmpty()
    public tutorialId: string

    @IsNotEmpty()
    @IsDefined()
    public data: CreateBlockDto

}