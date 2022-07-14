import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { HostfullyController } from './hostfully.controller';
import { HostfullyService } from './hostfully.service';

@Module({
  imports:[HttpModule],
  controllers: [HostfullyController],
  providers: [HostfullyService]
})
export class HostfullyModule {}
