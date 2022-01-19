import { Module } from '@nestjs/common';
import { TutorialNamesService } from './tutorial-names.service';
import { TutorialNamesController } from './tutorial-names.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tutorial, TutorialSchema } from './schemas/tutorial';

@Module({
  imports: [MongooseModule.forFeature([
    {name: Tutorial.name, schema: TutorialSchema}
  ])],
  controllers: [TutorialNamesController],
  providers: [TutorialNamesService],
  exports: [TutorialNamesService, MongooseModule]
})
export class TutorialNamesModule {}
