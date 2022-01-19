import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../providers/auth.service';
import { InvalidEmailOrPasswordError } from 'src/common/errors/login.error';
import { UserDocument } from 'src/features/users/schemas/user.schema';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const user: UserDocument = await this.authService.validateUser(email, password);
    if (!user) {
      throw new InvalidEmailOrPasswordError();
    }
    return user;
  }
}