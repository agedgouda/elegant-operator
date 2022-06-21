import { Test, TestingModule } from '@nestjs/testing';
import { HellosignService } from './hellosign.service';

describe('HellosignService', () => {
  let service: HellosignService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HellosignService],
    }).compile();

    service = module.get<HellosignService>(HellosignService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
