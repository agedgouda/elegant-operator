import { Module } from '@nestjs/common';
import { HellosignController } from './hellosign.controller';
import { HellosignService } from './hellosign.service';

@Module({
  controllers: [HellosignController],
  providers: [HellosignService]
})
export class HellosignModule {}
