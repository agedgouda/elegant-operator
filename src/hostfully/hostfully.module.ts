import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { HostfullyController } from './hostfully.controller';
import { HostfullyService } from './hostfully.service';
import { AlgoliaModule } from 'nestjs-algolia';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[
    ConfigModule.forRoot(),
    HttpModule,
    AlgoliaModule.register({
      applicationId: process.env.ALGOLIA_APPLICATION_ID,
      apiKey: process.env.ALGOLIA_API_KEY,
    })],
  controllers: [HostfullyController],
  providers: [HostfullyService]
})
export class HostfullyModule {}

