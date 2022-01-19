import { Module } from '@nestjs/common';
import { NavDataService } from './providers/nav-data.service';
import { NavDataController } from './nav-data.controller';
import { ChapterService } from './providers/chapter.service';
import { SectionService } from './providers/section.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Chapter, ChapterSchema } from './schemas/chapter';
import { Section, SectionSchema } from './schemas/section';
import { TutorialNamesModule } from '../tutorial-names/tutorial-names.module';

@Module({
  imports: [MongooseModule.forFeature([
    {name: Chapter.name, schema: ChapterSchema},
    {name: Section.name, schema: SectionSchema},
  ]), TutorialNamesModule],
  controllers: [NavDataController],
  providers: [NavDataService, ChapterService, SectionService]
})
export class NavDataModule {}
