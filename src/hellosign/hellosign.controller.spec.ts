import { Test, TestingModule } from '@nestjs/testing';
import { HellosignController } from './hellosign.controller';

describe('HellosignController', () => {
  let controller: HellosignController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HellosignController],
    }).compile();

    controller = module.get<HellosignController>(HellosignController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
