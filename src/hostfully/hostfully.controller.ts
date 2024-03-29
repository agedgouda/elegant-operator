import { Body, Controller, Post,Res,HttpStatus, Get, Param, Delete } from '@nestjs/common';
import { HostfullyService } from './hostfully.service';

@Controller('hostfully')
export class HostfullyController {
    constructor( private readonly hostfullyService:HostfullyService ) {}

    @Post('hostfully_update')
    async hostfullyPropertyUpdate(@Body() response): Promise<any> {
        console.log('update ',response);
        const hostfullyData = await this.hostfullyService.hostfullyPropertyUpdate(response.property_uid);
    }
    
    @Post('hostfully_delete')
    async hostfullyPropertyDelete(@Body() response): Promise<any> {
        console.log('delete ',response);
        const hostfullyData = await this.hostfullyService.deleteHostfullyProperty(response.property_uid);
    }

    @Get('hostfully_test_algolia')
    async testAlgolia() {
        return this.hostfullyService.algoliaTest();
        
    }

    @Get('all_properties')
    async getAllProperties() {
        return this.hostfullyService.getAllProperties();
        
    }
}
