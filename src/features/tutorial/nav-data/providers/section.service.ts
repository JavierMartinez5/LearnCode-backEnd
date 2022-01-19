import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from 'src/common/enums';
import { InappropriateRoleError } from 'src/common/errors/inappropriate-role.error';
import { UpdateError } from 'src/common/errors/updatate-error';
import { UpdateSectionDto } from '../dto/update-section.dto';
import { ISection, ISectionOnCreate } from '../interfaces';
import { ISectionDocument, Section } from '../schemas/section';

@Injectable()
export class SectionService {
  constructor(
    @InjectModel(Section.name) private sectionModel: Model<ISectionDocument>,
  ) {}

  private toSectionType(sections?: ISectionDocument[]): ISection[] {
    return sections.map((section) => {
      return {
        tutorialId: section.tutorialId,
        sectionId: section._id,
        sectionTitle: section.sectionTitle,
        position: section.position,
      };
    });
  }

  public async getAll(tutorialId: string): Promise<ISection[]> {
    const allSection: ISectionDocument[] = await this.sectionModel
      .find({ tutorialId })
      .exec();
    return this.toSectionType(allSection);
  }

  public async create(role: string, sectionOnCreateData: ISectionOnCreate): Promise<ISection> {
    if (role !== Role.Admin) {
      throw new InappropriateRoleError(403);
    }

    const newSection = await new this.sectionModel(sectionOnCreateData).save();
    return this.toSectionType([newSection])[0];
  }

  public async update(
    tutorialId: string,
    updateDto: UpdateSectionDto,
  ): Promise<UpdateSectionDto> {
    let allSections = await this.getAll(tutorialId);
    let isChangedSectionPosition = false;
    updateDto.sectionId = updateDto.sectionId.toString()
    
    allSections.forEach((section) => {
      if (section.sectionId.valueOf() === updateDto.sectionId && section.position !== updateDto.position) {
        isChangedSectionPosition = true;
      }
    });

    if (isChangedSectionPosition) {
      allSections = allSections.filter((section) => section.sectionId.valueOf() !== updateDto.sectionId)
      const firstPartOfAllNavData = allSections.slice(0, updateDto.position - 1);
      const secondPartOfAllNavData = allSections.slice(updateDto.position - 1, allSections.length);

      const sectionsDueToPositions = [...firstPartOfAllNavData, updateDto, ...secondPartOfAllNavData];
      const renewedSectionsPositions = sectionsDueToPositions.map((section, i) => {
          return {
            ...section,
            position: i + 1
          }
        });
      const updatedSectionsProm: Promise<UpdateSectionDto>[] = renewedSectionsPositions.map((section) => {
        return this.updateById(section.sectionId, section);
      });
      const updatedSections: UpdateSectionDto[] = await Promise.all(updatedSectionsProm)
      if (updatedSections) {
        return updatedSections.find((section) => section.sectionId.valueOf() === updateDto.sectionId)
      } else {
        throw new UpdateError();
      }
    } else {
      return this.updateById(updateDto.sectionId, updateDto);
    }
  }

  public async remove(id: string): Promise<ISection> {
    const removedSection = await this.sectionModel.findByIdAndRemove(id);
    return this.toSectionType([removedSection])[0];
  }

  public async updateById(id: string, updateDto: UpdateSectionDto): Promise<UpdateSectionDto> {
    const section: ISectionDocument = await this.sectionModel.findByIdAndUpdate(id, updateDto, {new: true})
    const updatedSection: UpdateSectionDto = {
      tutorialId: section.tutorialId,
      sectionId: section._id,
      position: section.position,
      sectionTitle: section.sectionTitle
    }
    return updatedSection
  }
}
