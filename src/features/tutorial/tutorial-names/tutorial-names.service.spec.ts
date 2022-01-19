import { Test, TestingModule } from '@nestjs/testing';
import { TutorialNamesService } from './tutorial-names.service';

describe('TutorialNamesService', () => {
  let service: TutorialNamesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TutorialNamesService],
    }).compile();

    service = module.get<TutorialNamesService>(TutorialNamesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
