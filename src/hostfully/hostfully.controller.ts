import { Body, Controller, Post,Res,HttpStatus, Get, Param } from '@nestjs/common';
import { HostfullyService } from './hostfully.service';

@Controller('hostfully')
export class HostfullyController {
    constructor( private readonly hostfullyService:HostfullyService ) {}

    @Post('hostfully_update')
    async hostfullyPropertyUpdate(@Body() response): Promise<any> {
        console.log(response);
        //const hostfullyData = await this.hostfullyService.hostfullyPropertyUpdate('57948400-a4b6-4800-b8e7-6a5114a0e225');
        const hostfullyData = await this.hostfullyService.hostfullyPropertyUpdate(response.property_uid);
    }
    @Get('hostfully_test_algolia')
    async testAlgolia() {
        return this.hostfullyService.algoliaTest();
        
    }
}
