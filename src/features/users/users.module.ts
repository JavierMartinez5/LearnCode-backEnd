import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { BcryptModule } from 'src/common/bcrypt/bcrypt.module';

@Module({
  imports: [MongooseModule.forFeature([
    {name: User.name, schema: UserSchema}
  ]), BcryptModule],
  controllers: [UsersController],
  exports: [UsersService, MongooseModule],
  providers: [UsersService],
  
})
export class UsersModule {}
