import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LeanDocument, Model } from 'mongoose';
import { EmailExistsError } from 'src/common/errors/email-exists.error';
import { InvalidEmailOrPasswordError } from 'src/common/errors/login.error';
import { CreateUserDto } from 'src/features/users/dto/create-user.dto';
import { User, UserDocument } from 'src/features/users/schemas/user.schema';
import { UsersService } from 'src/features/users/users.service';

import { LoginDto } from '../dtos/login.dto';
import { FormatedUser } from '../interfaces';
import { HashService } from './hash.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly hashService: HashService,
    private usersService: UsersService,
  ) { }

  public async loginLocal(data: LoginDto) {
    const user = await this.userModel
      .findOne({ email: data.email })
      .lean()
      .exec();
    const isValidPassword = await this.hashService.bcryptCompare(data.password, user.password);
    if(!isValidPassword) {
      throw new InvalidEmailOrPasswordError();
    }
    return user;
  }

  public async createNewUser(createUserDto: CreateUserDto): Promise<UserDocument> {
    const isAvailable = await this.validateEmail(createUserDto.email);
    if (isAvailable) {
      throw new EmailExistsError(400);
    }
    createUserDto.password = await this.hashService.bcryptPassword(createUserDto.password);
    // createUserDto.accessToken = this.generateAccessToken(createUserDto.email);
    return this.userModel.create(createUserDto);
  }
  
  public async validateEmail(email: string): Promise<boolean> {
    const user: LeanDocument<UserDocument> = await this.userModel
      .findOne({ email })
      .lean()
      .exec();
    return !!user;
  }

  public async validateUser(email: string, password: string): Promise<any> {
    const user: LeanDocument<UserDocument> = await this.usersService.findOne(email);
    if (!user) return null

    const isValidPassword = await this.hashService.bcryptCompare(password, user.password)

    if(isValidPassword) {
      return user;
    }
    
  }

  public async login(user: UserDocument): Promise<FormatedUser> {
    const access_token = this.hashService.generateAccessToken(user.email, user.userName, user._id, user.role)
    return {
      access_token,
      userId: user._id,
      email: user.email,
      userName: user.userName
    };
  }

  public async createUser(createUserDto: CreateUserDto): Promise<FormatedUser> {
    const isAvailable = await this.validateEmail(createUserDto.email);
    if (isAvailable) {
      throw new EmailExistsError(400);
    }
    createUserDto.password = await this.hashService.bcryptPassword(createUserDto.password);
    const user: UserDocument = await this.usersService.create(createUserDto)
    const access_token = this.hashService.generateAccessToken(user.email, user.userName, user._id, user.role)
    return {
      access_token,
      userId: user._id,
      email: user.email,
      userName: user.userName
    };
  }

}