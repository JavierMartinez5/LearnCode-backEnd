import { Test, TestingModule } from '@nestjs/testing';
import { NavDataService } from './providers/nav-data.service';

describe('NavDataService', () => {
  let service: NavDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NavDataService],
    }).compile();

    service = module.get<NavDataService>(NavDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
