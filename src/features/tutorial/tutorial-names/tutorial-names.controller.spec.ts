import { Test, TestingModule } from '@nestjs/testing';
import { TutorialNamesController } from './tutorial-names.controller';
import { TutorialNamesService } from './tutorial-names.service';

describe('TutorialNamesController', () => {
  let controller: TutorialNamesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TutorialNamesController],
      providers: [TutorialNamesService],
    }).compile();

    controller = module.get<TutorialNamesController>(TutorialNamesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
