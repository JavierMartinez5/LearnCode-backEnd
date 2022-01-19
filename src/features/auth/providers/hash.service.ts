import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from 'src/common/bcrypt/bcrypt.service';
// import * as jwt from 'jsonwebtoken';

@Injectable()
export class HashService {
    constructor(private jwtService: JwtService, private bcryptService: BcryptService) {}

    public generateAccessToken(email:string, userName: string, id: string, role: string): string {
        const payload = { email, userName, sub: id, role };
        return this.jwtService.sign(payload)
    }

    public async bcryptPassword(password: string): Promise<string> {
        return this.bcryptService.bcryptPassword(password);
    }
    
    public async bcryptCompare(password: string, comparerPassword: string): Promise<boolean>{
        return this.bcryptService.bcryptCompare(password, comparerPassword )
    }
}