import {  Injectable } from '@nestjs/common';
import { MailHandlerService } from 'src/mail-handler/mail-handler.service';

@Injectable()
export class HellosignService {
    constructor( 
        private  mailHandlerService: MailHandlerService,
    ) {}
    async agreementSigned(signerInfo): Promise<any> {
       // var client = await this.clientService.findClientBySignatureID(signerInfo.signature_id);
        const run = await this.mailHandlerService.agreementSigned(signerInfo);
        return run;
    }
}