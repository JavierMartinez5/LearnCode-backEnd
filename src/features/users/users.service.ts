import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LeanDocument, Model } from 'mongoose';
import { BcryptService } from 'src/common/bcrypt/bcrypt.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';


@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private bcryptService: BcryptService
  ) {}

  findAll() {
    return `This action returns all users`;
  }

  async findOne(email: string) {
    const user: LeanDocument<UserDocument> = await this.userModel
      .findOne({ email })
      .lean()
      .exec();
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {

    if (updateUserDto.password) {
      updateUserDto.password = await this.bcryptService.bcryptPassword(updateUserDto.password)
    }
    const res = await this.userModel.findByIdAndUpdate(id, updateUserDto, {new: true})
    return res
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto);
  }

  public async validateEmail(email: string): Promise<boolean> {
    const user: LeanDocument<UserDocument> = await this.userModel
      .findOne({ email })
      .lean()
      .exec();
    return !!user;
  }
}
