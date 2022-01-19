
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {

    public async bcryptPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
    
    public async bcryptCompare(password: string, comparerPassword: string): Promise<boolean>{
        return bcrypt.compare(password, comparerPassword )
    }
}