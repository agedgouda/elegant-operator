import { Module } from '@nestjs/common';
import { HellosignController } from './hellosign.controller';
import { HellosignService } from './hellosign.service';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { MailHandlerService } from 'src/mail-handler/mail-handler.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [NestjsFormDataModule,HttpModule],
  controllers: [HellosignController],
  providers: [HellosignService,MailHandlerService]
})
export class HellosignModule {}