import { Test, TestingModule } from '@nestjs/testing';
import { MailHandlerController } from './mail-handler.controller';

describe('MailHandlerController', () => {
  let controller: MailHandlerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MailHandlerController],
    }).compile();

    controller = module.get<MailHandlerController>(MailHandlerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
