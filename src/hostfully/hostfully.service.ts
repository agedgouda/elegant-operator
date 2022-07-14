import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class HostfullyService {
    constructor(
        private configService: ConfigService,
        private readonly httpService:HttpService
    ){}

    async hostfullyPropertyUpdate(hostfullyID) {
        
        const hostfullyProperty = await lastValueFrom(this.httpService.get(
            this.configService.get<string>('HOSTFULL_API_URL')+hostfullyID,
            { 'headers': {
                    'Accept':'application/json',
                    'X-HOSTFULLY-APIKEY':this.configService.get<string>('HOSTFULLY_APIKEY'),
                }
            }
        ).pipe(
            map(response => response.data)
        ));
        console.log(hostfullyProperty) ;
       return hostfullyProperty;
    }}
