import { Body, Controller, Post,Res,HttpStatus } from '@nestjs/common';
import { HellosignService } from './hellosign.service';
import { Response } from 'express';
import { FormDataRequest } from 'nestjs-form-data';

@Controller('hellosign')
export class HellosignController {
    constructor( private readonly helloSignService:HellosignService ) {}
    @Post('hellosign_event')
    @FormDataRequest()
    agreementSigned(
    @Body('json') event: string,
    @Res() res: Response)
    {
        if (!event.length) {
            res.status(HttpStatus.NOT_FOUND).send('Hello API Event Failed');
        } else {
            const helloSignEvent = JSON.parse(event);
            console.log(helloSignEvent.event);
            //check to see if everybody signed the docu
            if(helloSignEvent.event.event_type === 'signature_request_all_signed') {
                //double check to make sure the person sent the onboarding agreement, then send the update mailchimp and send the onboarding email.
                if(helloSignEvent.signature_request.signatures[1].status_code === 'signed' ){
                    console.log(helloSignEvent.signature_request.signatures[1].signer_email_address);
                    console.log(helloSignEvent.signature_request.signatures);
                    const emailAddress = helloSignEvent.signature_request.signatures[1].signer_email_address;
                    const recipient = helloSignEvent.signature_request.signatures[1].signer_name;
                    //const response = this.helloSignService.agreementSigned(emailAddress,recipient);
                    //return response;
                }
            }
            
            res.status(HttpStatus.OK).send('Hello API Event Received');
        } 
        
    }
     
}
