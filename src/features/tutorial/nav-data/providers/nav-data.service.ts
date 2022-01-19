import { Injectable } from '@nestjs/common';
import { Role } from 'src/common/enums';
import { InappropriateRoleError } from 'src/common/errors/inappropriate-role.error';
import { TutorialNamesService } from '../../tutorial-names/tutorial-names.service';
import { CreateBlockDto } from '../dto/create-block-dto';
import { UpdateBlockDto } from '../dto/update-block-dto';
import { UpdateChapterDto } from '../dto/update-chapter-dto';
import { UpdateSectionDto } from '../dto/update-section.dto';
import { IChapter, IChapterOnCreate, INavData, ISection, ISectionOnCreate } from '../interfaces';
import { ChapterService } from './chapter.service';
import { SectionService } from './section.service';


@Injectable()
export class NavDataService {
  constructor(
    private sectionService: SectionService,
    private chaterService: ChapterService,
    private tutorialNamesService: TutorialNamesService
  ) {}

  public async getAllNavData(tutorialId: string): Promise<INavData[]> {
    await this.tutorialNamesService.findById(tutorialId)
    
    const allSections = await this.sectionService.getAll(tutorialId)
    const chaptersInAllSectionsProm = allSections.map((section) => {
      const chaptersInOneSection: Promise<IChapter[]> = this.chaterService.getAll(section.sectionId)
      return chaptersInOneSection
    })
    const chaptersInAllSections = await Promise.allSettled(chaptersInAllSectionsProm)
    return chaptersInAllSections.map<INavData>((currentValue, currentIndex) => {
      if (currentValue.status === 'fulfilled') {
        const navDataItem: INavData = {
          section: allSections[currentIndex],
          chapters: currentValue.value
        }
        return navDataItem
      } else {
        return { section: allSections[currentIndex], chapters: [] }
      }
    })
  }

  public async createNavData(tutorialId: string, createBlockDto: CreateBlockDto, role: string): Promise<INavData> {
    const sectionOnCreate: ISectionOnCreate = {tutorialId, sectionTitle: createBlockDto.section.sectionTitle, position: createBlockDto.section.position}
    const newSection = await this.sectionService.create(role, sectionOnCreate)
    if (!newSection) return

    const chaptersInSectionProm: Promise<IChapter>[] = createBlockDto.chapters.map<Promise<IChapter>>((chapter) => {
      const chapterOnCreate: IChapterOnCreate = {sectionId: newSection.sectionId, chapterTitle: chapter.chapterTitle, position: chapter.position}
      return this.chaterService.create(role, chapterOnCreate)
    })
    const newChapters = await Promise.all(chaptersInSectionProm)
    if (!newChapters) return

    const navDataItem: INavData = {
      section: newSection,
      chapters: newChapters
    }
    return navDataItem;
  }

  public async updateNavData(updateDto: UpdateBlockDto, role: string): Promise<INavData> {
    if (role !== Role.Admin) {
      throw new InappropriateRoleError(403);
    }
    const updatedSection: UpdateSectionDto = await this.sectionService.update(updateDto.section.tutorialId, updateDto.section)

    let updatedChapters!: UpdateChapterDto[]
    if (updateDto.chapters.length) {
      updatedChapters = await this.chaterService.update(updateDto.chapters)
    } else {
      updatedChapters = []
    }

    const updatedNavData: INavData = {
      section: updatedSection,
      chapters: updatedChapters
    }
    return updatedNavData
  }
}
