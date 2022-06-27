import { Test, TestingModule } from '@nestjs/testing';
import { MailHandlerService } from './mail-handler.service';

describe('MailHandlerService', () => {
  let service: MailHandlerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailHandlerService],
    }).compile();

    service = module.get<MailHandlerService>(MailHandlerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
