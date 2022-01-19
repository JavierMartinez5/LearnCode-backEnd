
import { IsString, IsEmail, IsNotEmpty, IsDefined } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    public userName: string

    @IsEmail()
    @IsNotEmpty()
    @IsDefined()
    public readonly email: string;

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    public password: string;

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    public role: string;
}