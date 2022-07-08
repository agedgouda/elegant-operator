import {  Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HellosignModule } from './hellosign/hellosign.module';
import { MailHandlerModule } from './mail-handler/mail-handler.module';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientModule } from './client/client.module';
import ormconfig from './ormconfig';

@Module({
  imports: [
    HellosignModule, 
    MailHandlerModule,
    ConfigModule.forRoot({
      isGlobal: true, // no need to import into other modules
    }),
    HttpModule,
    TypeOrmModule.forRoot(ormconfig),
    ClientModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
