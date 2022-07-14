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
    async hostfullyPropertyUpdate(@Body() response): Promise<any> {
        return this.hostfullyService.hostfullyPropertyUpdate(response.property_uid);
    }
    @Post('hostfully_update_local')
    async hostfullyPropertyUpdateLocal() {
        return this.hostfullyService.hostfullyPropertyUpdate('6cc1759e-81e5-400b-860c-41b6ba705c49');
        
    }
}
