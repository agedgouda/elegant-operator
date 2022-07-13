import { Body, Controller, Post,Res,HttpStatus, Get } from '@nestjs/common';
import { HostfullyService } from './hostfully.service';

@Controller('hostfully')
export class HostfullyController {
    constructor( private readonly hostfullyService:HostfullyService ) {}

    @Get('hostfully')
    test() {
        return 'eynow'
    }
    @Post('hostfully_update')
    hostfullyPropertyUpdate() {
        return this.hostfullyService.hostfullyPropertyUpdate('TEST');
    }
}
