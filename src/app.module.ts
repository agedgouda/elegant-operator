import {  Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HellosignModule } from './hellosign/hellosign.module';
import { MailHandlerModule } from './mail-handler/mail-handler.module';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyController } from './property/property.controller';
import config from './ormconfig';
import { HostfullyModule } from './hostfully/hostfully.module';


@Module({
  imports: [
    HostfullyModule,
    HellosignModule, 
    MailHandlerModule,
    ConfigModule.forRoot({
      isGlobal: true, // no need to import into other modules
    }),
    HttpModule,
    TypeOrmModule.forRoot(config),
  ],
  controllers: [AppController, PropertyController],
  providers: [AppService],
})
export class AppModule {}
