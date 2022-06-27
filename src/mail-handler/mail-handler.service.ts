import {  Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import Mailchimp = require('mailchimp-api-v3');
//import { MailService } from 'src/mail/mail.service';


@Injectable()
export class MailHandlerService {
    constructor(private httpService: HttpService) {}
    async agreementSigned(address,recipient): Promise<any> {
        const mailchimp = require('@mailchimp/mailchimp_marketing');
        mailchimp.setConfig({
            apiKey: 'd3df4fa84d34d72979384d59719fd8d0-us13',
            server: 'us13',
          });

        const addToMailChimp = await mailchimp.lists.setListMember(
                "a4401176b5",
                address,
                {
                    email_address: address,
                    status: "subscribed",
                }
            );
        
        const response = await mailchimp.automations.addWorkflowEmailSubscriber (
            "76270ec05e",
            address,
            { email_address: address }
        );
        //https://us13.api.mailchimp.com/3.0/automations/76270ec05e/emails/455feb0f2d/queue
        return response;
    }
}
