import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientEntity } from './client.entity';

@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(ClientEntity)
        private readonly clientEntity:Repository<ClientEntity>
    ) {}

    async findClientByEmail(email: string): Promise<ClientEntity> {
        return this.clientEntity.findOne({email});
    }
}
