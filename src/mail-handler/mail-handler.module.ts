import { Module } from '@nestjs/common';
import { MailHandlerService } from './mail-handler.service';
import { MailHandlerController } from './mail-handler.controller';
import { MailModule } from 'src/mail/mail.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [MailModule,HttpModule,ConfigModule],
  providers: [MailHandlerService],
  controllers: [MailHandlerController]
})
export class MailHandlerModule {}
