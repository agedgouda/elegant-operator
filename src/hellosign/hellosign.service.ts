import {  Injectable } from '@nestjs/common';
import { MailHandlerService } from 'src/mail-handler/mail-handler.service';
import { ClientService } from 'src/client/client.service';

@Injectable()
export class HellosignService {
    constructor( 
        private  mailHandlerService: MailHandlerService,
        private  clientService: ClientService,
    ) {}
    async agreementSigned(signerInfo): Promise<any> {
        var client = await this.clientService.findClientBySignatureID(signerInfo.signature_id);
        var returnStatus = '';
        if (!client) {
            const run = await this.mailHandlerService.agreementSigned(signerInfo);
            client = await this.clientService.addClient(signerInfo.signer_email_address,'signed agreement',signerInfo.signature_id)
            console.log(run);
            returnStatus = client.email+' added';
        } else {
            returnStatus = signerInfo.signer_email_address+' already processed';
        } 
        return returnStatus;
    }
}