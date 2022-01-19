import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from 'src/common/enums';
import { InappropriateRoleError } from 'src/common/errors/inappropriate-role.error';
import { CreateChapterDto } from '../dto/create-chapter.dto';
import { UpdateChapterDto } from '../dto/update-chapter-dto';
import { IChapter, IChapterOnCreate } from '../interfaces';
import { Chapter, IChapterDocument } from '../schemas/chapter';

@Injectable()
export class ChapterService {
  constructor(
    @InjectModel(Chapter.name) private chapterModel: Model<IChapterDocument>,
  ) {}

  private toChapterType(chapters?: IChapterDocument[]): IChapter[] {
    return chapters.map(chapter => {
      return {
        sectionId: chapter.sectionId,
        chapterId: chapter._id,
        chapterTitle: chapter.chapterTitle,
        position: chapter.position
      }
    });
  }

  public async getAll(sectionId: string): Promise<IChapter[]> {
    const allChapters: IChapterDocument[] = await this.chapterModel
      .find({ sectionId })
      .exec();
    return this.toChapterType(allChapters)
  }

  public async create(
    role: string,
    chapterOnCreateData: IChapterOnCreate,
  ): Promise<IChapter> {
    if (role !== Role.Admin) {
      throw new InappropriateRoleError(403);
    }
    const newChapter: IChapterDocument = await new this.chapterModel(chapterOnCreateData).save();
    return this.toChapterType([newChapter])[0]
  }

  public async update(
    updateDto: UpdateChapterDto[],
  ): Promise<UpdateChapterDto[]> {
    const updatedChapters: Promise<UpdateChapterDto>[] = updateDto.map(chapter => {
      return this.updateById(chapter.chapterId, chapter)
    })
    return Promise.all(updatedChapters)
  }

  public async updateById(id: string, updateDto: UpdateChapterDto): Promise<UpdateChapterDto> {
    const chapter: IChapterDocument = await this.chapterModel.findByIdAndUpdate(id, updateDto, {new: true})
    const updatedChapter: UpdateChapterDto = {
      sectionId: chapter.sectionId,
      chapterId: chapter._id,
      position: chapter.position,
      chapterTitle: chapter.chapterTitle
    }
    return updatedChapter
  }

  public async remove(id: string): Promise<IChapter> {
    const removedChapter: IChapterDocument = await this.chapterModel.findByIdAndRemove(id);
    return this.toChapterType([removedChapter])[0]
  }
}
