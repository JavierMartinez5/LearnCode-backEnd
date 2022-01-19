import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { BcryptModule } from "src/common/bcrypt/bcrypt.module";
import { User, UserSchema } from "../users/schemas/user.schema";
import { UsersModule } from "../users/users.module";
import { jwtConstants } from "./consts";
import { AuthController } from "./controllers/auth.controller";
import { JwtStrategy } from "./passport/jwt.strategy";
import { LocalStrategy } from "./passport/local.strategy";

import { AuthService } from "./providers/auth.service";
import { HashService } from "./providers/hash.service";

@Module({
    imports: [BcryptModule, MongooseModule.forFeature([
        {name: User.name, schema: UserSchema}
      ]), UsersModule, PassportModule, JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '1d' },
      }),],
    providers: [AuthService, HashService, LocalStrategy, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService, HashService],
})
export class AuthModule { }