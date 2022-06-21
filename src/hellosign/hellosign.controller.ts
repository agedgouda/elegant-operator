import { Body, Controller, Post,Res,HttpStatus } from '@nestjs/common';
import { HellosignService } from './hellosign.service';
import { Response } from 'express';
import { HelloSignEvent } from './dto/helloSignEvent.dto';

@Controller('hellosign')
export class HellosignController {
    constructor( private readonly helloSignService:HellosignService ) {}
    @Post('hellosign_event')
    agreementSigned(
    @Body() helloSignEvent: HelloSignEvent,
    @Res() res: Response)
    {
        console.log(helloSignEvent)
        res.status(HttpStatus.OK).send('Hello API Event Received');
        return this.helloSignService.agreementSigned();
    }
     
}
