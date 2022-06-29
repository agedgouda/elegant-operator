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
            
            //if(helloSignEvent.event.event_type === 'signature_request_all_signed') {
                const emailAddress = 'agedgouda@gmail.com';
                const recipient = 'Bob';
                const response = this.helloSignService.agreementSigned(emailAddress,recipient);
            //}
            
            res.status(HttpStatus.OK).send('Hello API Event Received');
        } 
        
    }
     
}
