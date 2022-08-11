import {  Injectable } from '@nestjs/common';
import { MailHandlerService } from 'src/mail-handler/mail-handler.service';

@Injectable()
export class HellosignService {
    constructor( 
        private  mailHandlerService: MailHandlerService,
    ) {}
    async agreementSigned(signerInfo): Promise<any> {
        const run = await this.mailHandlerService.agreementSigned(signerInfo);
        return run;
    }
}