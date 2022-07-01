import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailHandlerService } from './mail-handler.service';
import { MailHandlerController } from './mail-handler.controller';
import { HttpModule } from '@nestjs/axios';
import { join } from 'path';
import {  ConfigService } from '@nestjs/config';


@Module({
  
  imports: [ HttpModule,
    MailerModule.forRootAsync({
      // imports: [ConfigModule], // import module if not enabled globally
      useFactory: async (config: ConfigService) => ({
        // transport: config.get("MAIL_TRANSPORT"),secure: false,
        // or
        transport: {
          host: config.get('MAIL_HOST'),
          port: 587,
          auth: {
            user: config.get('MAIL_USER'),
            pass: config.get('SENDGRID_API_KEY'),
          },
        },
        defaults: {
          from: `${config.get('MAIL_FROM_NAME')} <${config.get('MAIL_FROM')}>`,
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    })],
  providers: [MailHandlerService],
  controllers: [MailHandlerController]
})
export class MailHandlerModule {}
