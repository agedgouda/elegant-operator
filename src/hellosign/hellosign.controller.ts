import { Body, Controller, Post,Res,HttpStatus } from '@nestjs/common';
import { HellosignService } from './hellosign.service';
import { Response } from 'express';
import { FormDataRequest } from 'nestjs-form-data';
import { HelloSignEventDto } from './dto/helloSignEvent.dto';

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
            const response = this.helloSignService.agreementSigned(helloSignEvent);
            res.status(HttpStatus.OK).send('Hello API Event Received');
        } 
        
    }
     
}
