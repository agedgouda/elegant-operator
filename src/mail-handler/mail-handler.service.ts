import {  Injectable } from '@nestjs/common';
import Mailchimp = require('mailchimp-api-v3');
import {  ConfigService } from '@nestjs/config';
//import { MailService } from 'src/mail/mail.service';


@Injectable()
export class MailHandlerService {
    constructor(private configService: ConfigService) {}
    async agreementSigned(address,recipient): Promise<any> {
        
        const mailchimp = require('@mailchimp/mailchimp_marketing');
        mailchimp.setConfig({
            apiKey: this.configService.get<string>('API_KEY'),
            server: this.configService.get<string>('SERVER'),
          });

        const addToMailChimp = await mailchimp.lists.setListMember(
            this.configService.get<string>('LIST_NUMBER'),
                address,
                {
                    email_address: address,
                    status: "subscribed",
                }
            );
        /*
        const mailchimpResponse = await mailchimp.automations.addWorkflowEmailSubscriber (
            "76270ec05e",
            address,
            { email_address: address }
        );
        */
        //https://us13.api.mailchimp.com/3.0/automations/76270ec05e/emails/455feb0f2d/queue
        return addToMailChimp;
    }
}
