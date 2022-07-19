import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlgoliaService } from 'nestjs-algolia';

@Injectable()
export class HostfullyService {
    constructor(
        private configService: ConfigService,
        private readonly httpService:HttpService,
        private readonly algoliaService: AlgoliaService
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
        const hostfullyData = {
            name: hostfullyProperty.name,
            active: hostfullyProperty.isActive,
            type: hostfullyProperty.type,
            bedroom: hostfullyProperty.bedrooms,
            bath: hostfullyProperty.bathrooms,
            address: hostfullyProperty.address1,
            city: hostfullyProperty.city,
            state: hostfullyProperty.state,
            zip: hostfullyProperty.postalCode,
            wifi_password: hostfullyProperty.wifiPassword,
            hostfully: hostfullyProperty.webLink,
            airbnb: hostfullyProperty.listingLinks.airbnbUrl,
            vrbo: hostfullyProperty.listingLinks.homeAwayUrl,
            image: hostfullyProperty.picture,
            beds: hostfullyProperty.bedCount,
            reviews: hostfullyProperty.reviews.total,
            objectID: hostfullyProperty.uid 
        }
        const index = await this.algoliaService.initIndex(this.configService.get<string>('ALGOLIA_INDEX'));
        const oldRecord = await index.getObject(hostfullyProperty.uid);
        const algoliaUpdate = await index.partialUpdateObject(hostfullyData, {createIfNotExists: true});
        
        const updateLog = {
            "hostfullyData":hostfullyData,
            "oldRecord":oldRecord,
            "algoliaUpdate":algoliaUpdate,
        }

        console.log(updateLog);
        
        return updateLog;
    }

    private async algoliaTest(hostfullyProperty) {
        const index = await this.algoliaService.initIndex(this.configService.get<string>('ALGOLIA_INDEX'));
        const ollie = await index.search(hostfullyProperty.uid)
        console.log(ollie)
        return ollie;
    }


}
