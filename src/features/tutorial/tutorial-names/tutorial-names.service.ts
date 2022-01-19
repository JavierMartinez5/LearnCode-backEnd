import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Role } from 'src/common/enums';
import { InappropriateRoleError } from 'src/common/errors/inappropriate-role.error';
import { InvalidIdError } from 'src/common/errors/invalid-id.error';
import { TutorialDoesNotExistError } from 'src/common/errors/tutorial-doesNot-exist.error';
import { CreateTutorialNameDto } from './dto/create-tutorial-name.dto';
import { UpdateTutorialNameDto } from './dto/update-tutorial-name.dto';
import { ITutorial } from './interfaces';
import { ITutorialDocument, Tutorial } from './schemas/tutorial';

@Injectable()
export class TutorialNamesService {
  constructor(
    @InjectModel(Tutorial.name) private tutorialModel: Model<ITutorialDocument>,
  ) {}
  
  private toITutorialType(tutorial: ITutorialDocument): ITutorial {
    return {
      tutorialId: tutorial._id,
      tutorialName: tutorial.tutorialName
    }
  }

  async create(createTutorialNameDto: CreateTutorialNameDto, role: string,): Promise<ITutorial> {
    if (role !== Role.Admin) {
      throw new InappropriateRoleError();
    }
    const tutorial = await new this.tutorialModel(createTutorialNameDto).save();
    return this.toITutorialType(tutorial)
  }

  async findAll(): Promise<ITutorial[]> {
    const tutorials = await this.tutorialModel.find().exec()
    if (!tutorials.length) return []

    const formatedTutorials: ITutorial[] = tutorials.map((tutorial: ITutorialDocument) => {
      return this.toITutorialType(tutorial)
    })
    return formatedTutorials
  }

  async findById(id: string): Promise<ITutorial> {
    if (isValidObjectId(id)) {
      const tutorial = await this.tutorialModel.findById(id).exec()
      if (!tutorial) {
        throw new TutorialDoesNotExistError();
      }
      return this.toITutorialType(tutorial)
    } else {
      throw new InvalidIdError()
    }
  }

  async update(id: number, updateTutorialNameDto: UpdateTutorialNameDto) {
    return `This action updates a #${id} tutorialName`;
  }

  async remove(id: number) {
    return `This action removes a #${id} tutorialName`;
  }
}
