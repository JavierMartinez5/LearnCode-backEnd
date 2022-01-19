import { Test, TestingModule } from '@nestjs/testing';
import { NavDataController } from './nav-data.controller';
import { NavDataService } from './providers/nav-data.service';

describe('NavDataController', () => {
  let controller: NavDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NavDataController],
      providers: [NavDataService],
    }).compile();

    controller = module.get<NavDataController>(NavDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
