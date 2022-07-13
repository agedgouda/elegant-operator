import { Test, TestingModule } from '@nestjs/testing';
import { HostfullyService } from './hostfully.service';

describe('HostfullyService', () => {
  let service: HostfullyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HostfullyService],
    }).compile();

    service = module.get<HostfullyService>(HostfullyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
