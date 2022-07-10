import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientEntity } from './client.entity';
import { CreateClientDto } from './dto/createClientDto.dto';

@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(ClientEntity)
        private readonly clientEntity:Repository<ClientEntity>
    ) {}

    async findClientByEmail(email: string): Promise<ClientEntity> {
        return this.clientEntity.findOneBy({email});
    }
    async findClientBySignatureID(signature_id: string): Promise<ClientEntity> {
        return this.clientEntity.findOneBy({signature_id});
    }

    async addClient(clientEmail:string,status: string,signatureID: string): Promise<ClientEntity> {
        return this.clientEntity.save(
            {
                client_email: clientEmail,
                status: status,
                signature_id: signatureID,
            });
    }
}