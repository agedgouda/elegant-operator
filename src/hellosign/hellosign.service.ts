import {  Injectable } from '@nestjs/common';
import { MailHandlerService } from 'src/mail-handler/mail-handler.service';

@Injectable()
export class HellosignService {
    constructor( private  mailHandlerService: MailHandlerService) {}
    async agreementSigned(response): Promise<any> {
        //if (response.event.event_type == 'signature_request_all_signed'){
            const run = await this.mailHandlerService.agreementSigned('age.d.go.ud.a@gmail.com','test')
            console.log(run)
       // }
        return run;
    }
}