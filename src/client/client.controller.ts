import { Controller, Get, Param } from '@nestjs/common';
import { ClientService } from './client.service';

@Controller('clients')
export class ClientController {
    constructor( private readonly clientService:ClientService ) {}

    @Get('/:email')
    async findClientByEmail(@Param('email') email:string):Promise<any> {
        const client = await this.clientService.findClientByEmail(email)
        return client;
    }
}
