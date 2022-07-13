import { Test, TestingModule } from '@nestjs/testing';
import { HostfullyController } from './hostfully.controller';

describe('HostfullyController', () => {
  let controller: HostfullyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HostfullyController],
    }).compile();

    controller = module.get<HostfullyController>(HostfullyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
