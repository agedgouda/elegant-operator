import { Module } from '@nestjs/common';
import { MailHandlerService } from './mail-handler.service';
import { MailHandlerController } from './mail-handler.controller';
import { MailModule } from 'src/mail/mail.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [MailModule,HttpModule],
  providers: [MailHandlerService],
  controllers: [MailHandlerController]
})
export class MailHandlerModule {}
