import {  Injectable } from '@nestjs/common';
import Mailchimp = require('mailchimp-api-v3');
import {  ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';


@Injectable()
export class MailHandlerService {
    constructor(
        private configService: ConfigService,
        private mailerService: MailerService,
    ) {}
    async agreementSigned(signerInfo): Promise<any> {
        
        //send the signer's name and email address to mailchimp
        const mailchimp = require('@mailchimp/mailchimp_marketing');
        mailchimp.setConfig({
            apiKey: this.configService.get<string>('API_KEY'),
            server: this.configService.get<string>('SERVER'),
          });

        const addToMailChimp = await mailchimp.lists.setListMember(
            this.configService.get<string>('LIST_NUMBER'),
                signerInfo.signer_email_address,
                {
                    email_address: signerInfo.signer_email_address,
                    status: "subscribed",
                }
            );
        
        //email onboarding scheduling email
        const mailServiceResponse = await this.sendMail(signerInfo.signer_email_address,
            signerInfo.signer_name,
            'scheduleOnboardingMeeting',
            'Welcome to Elegance.Rent, Let\'s finalize onboarding!'
        );
        return addToMailChimp;
    }
    private async sendMail(address,recipient,template,subject) {
        const mailServiceResponse = await this.mailerService.sendMail({
        to: recipient+' <'+address+'>',
        cc: 'Nikka Alvaran <Nikka@elegance.rent>',
        bcc: 'Jeff Kaufman <jeff@elegance.rent>',
        subject: subject,
        template: './'+template,
        context: {
          name: address,
          recipient: recipient,
          calendlyAddress: this.configService.get<string>('CALENDLY_URL')
        },
      })
      
      return mailServiceResponse;
    }
      
} 
