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
            
            if(helloSignEvent.event.event_type === 'signature_request_signed') {
                if(helloSignEvent.signature_request.signatures[1].status === 'signed' ) {
                    console.log(helloSignEvent.signature_request.signatures.signatures[1].signer_email_address);
                    const emailAddress = helloSignEvent.signature_request.signatures[1].signer_email_address;
                    const recipient = helloSignEvent.signature_request.signatures[1].signer_name;
                    const response = this.helloSignService.agreementSigned(emailAddress,recipient);
                    return response;
                }
            }
            
            res.status(HttpStatus.OK).send('Hello API Event Received');
        } 
        
    }
     
}
