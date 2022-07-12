import {  Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HellosignModule } from './hellosign/hellosign.module';
import { MailHandlerModule } from './mail-handler/mail-handler.module';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HellosignModule, 
    MailHandlerModule,
    ConfigModule.forRoot({
      isGlobal: true, // no need to import into other modules
    }),
    HttpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
