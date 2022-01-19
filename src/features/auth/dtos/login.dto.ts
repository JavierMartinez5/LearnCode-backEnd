import { IsString, IsEmail, IsNotEmpty, IsDefined } from 'class-validator';

export class LoginDto {

    @IsEmail()
    @IsNotEmpty()
    @IsDefined()
    public readonly email!: string;

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    public password!: string;
}