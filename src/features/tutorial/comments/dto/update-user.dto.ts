import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {

    @IsString()
    @IsNotEmpty()
    public userName?: string

    @IsEmail()
    @IsNotEmpty()
    public readonly email?: string;

    @IsString()
    @IsNotEmpty()
    public password?: string;
}
