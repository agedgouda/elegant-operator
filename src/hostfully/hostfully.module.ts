import { Module } from '@nestjs/common';
import { HostfullyController } from './hostfully.controller';
import { HostfullyService } from './hostfully.service';

@Module({
  controllers: [HostfullyController],
  providers: [HostfullyService]
})
export class HostfullyModule {}
