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
        
        const hostfullyData = await this.getHostfullyProperty(hostfullyID);
        const index = await this.algoliaService.initIndex(this.configService.get<string>('ALGOLIA_INDEX'));
        const oldRecord = await index.getObject(hostfullyID);
        const algoliaUpdate = await index.partialUpdateObject(hostfullyData, {createIfNotExists: true});
        
        const updateLog = {
            "hostfullyData":hostfullyData,
            "oldRecord":oldRecord,
            "algoliaUpdate":algoliaUpdate,
        }

        console.log(updateLog);
        
        return updateLog;
    }

    async algoliaTest() {
        const index = await this.algoliaService.initIndex(this.configService.get<string>('ALGOLIA_INDEX'));
        const ollie = await index.search('',{hitsPerPage: 71}) 
        console.log(ollie)
        return ollie;
    }


    async getHostfullyProperty(hostfullyID) {
        
        const hostfullyProperty = await this.getHostfullyData(this.configService.get<string>('HOSTFULL_API_URL')+"properties/"+hostfullyID) ;
        const hostfullyPropertyOwnership = await this.getHostfullyData(this.configService.get<string>('HOSTFULL_API_URL')+"propertyownership/"+hostfullyID) ;
        const hostfullyPropertyOwner = await this.getHostfullyData(this.configService.get<string>('HOSTFULL_API_URL')+"owners/"+hostfullyPropertyOwnership.ownerUid) ;
        const hostfullyPropertyAmmenities = await this.getHostfullyData(this.configService.get<string>('HOSTFULL_API_URL')+"amenities/"+hostfullyID) ;
        const hostfullyPropertyDescription = await this.getHostfullyData(this.configService.get<string>('HOSTFULL_API_URL')+"propertydescriptions?propertyUid="+hostfullyID) ;

        const hostfullyData = {
            name: hostfullyProperty.name,
            public_name:hostfullyPropertyDescription[0].name,
            notes:hostfullyPropertyDescription[0].notes,
            tier:"Premium",
            exterminator: "false",
            insurance: "false",
            maintenance: "Rob Kennison",
            consumables: "false",
            email: hostfullyPropertyOwner.email,
            phone:hostfullyPropertyOwner.phoneNumber,
            hostname: hostfullyPropertyOwner.firstName+" "+hostfullyPropertyOwner.lastName,
            pets:hostfullyPropertyAmmenities.allowsPets,
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

        return(hostfullyData);
    }

    private async getHostfullyData(url) {
        console.log(url)
        return await lastValueFrom(this.httpService.get(
            url,
            { 'headers': {
                    'Accept':'application/json',
                    'X-HOSTFULLY-APIKEY':this.configService.get<string>('HOSTFULLY_APIKEY'),
                }
            }
        ).pipe(
            map(response => response.data)
        ));
        }


}
