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
        const algoliaUpdate = await index.partialUpdateObject(hostfullyData, {createIfNotExists: true});
        
        const updateLog = {
            "hostfullyData":hostfullyData,
            "algoliaUpdate":algoliaUpdate,
        }

        console.log(updateLog);
        
        return updateLog;
    }

    async deleteHostfullyProperty(hostfullyID) {
        const index = await this.algoliaService.initIndex(this.configService.get<string>('ALGOLIA_INDEX'));
        const algoliaDelete = await index.deleteObject(hostfullyID);
        console.log(algoliaDelete);
        return algoliaDelete;

    }

    async addHostfullyProperty(hostfullyID) {
        const hostfullyData = await this.getHostfullyProperty(hostfullyID);
        hostfullyData['tier'] = "Premium";
        const index = await this.algoliaService.initIndex(this.configService.get<string>('ALGOLIA_INDEX'));
        const algoliaDelete = await index.saveObject(hostfullyData);
        console.log(algoliaDelete);
        return algoliaDelete;

    }

    async algoliaTest() {
        const index = await this.algoliaService.initIndex(this.configService.get<string>('ALGOLIA_INDEX'));
        const ollie = await index.search('',{hitsPerPage: 71}) 
        console.log(ollie)
        return index;
    }


    private async getHostfullyProperty(hostfullyID) {
        const hostfullyProperty = await this.getHostfullyData(this.configService.get<string>('HOSTFULL_API_URL')+"properties/"+hostfullyID) ;
        console.log(hostfullyProperty);
        const hostfullyPropertyOwnership = await this.getHostfullyData(this.configService.get<string>('HOSTFULL_API_URL')+"propertyownership/"+hostfullyID) ;
        console.log(hostfullyPropertyOwnership);
        
        const hostfullyPropertyOwner = await this.getHostfullyData(this.configService.get<string>('HOSTFULL_API_URL')+"owners/"+hostfullyPropertyOwnership.ownerUid) ;
        console.log(hostfullyPropertyOwner);
        
        const hostfullyPropertyAmmenities = await this.getHostfullyData(this.configService.get<string>('HOSTFULL_API_URL')+"amenities/"+hostfullyID) ;
        console.log(hostfullyPropertyAmmenities);
        
        const hostfullyPropertyDescription = await this.getHostfullyData(this.configService.get<string>('HOSTFULL_API_URL')+"propertydescriptions?propertyUid="+hostfullyID) ;

        const avgRating = hostfullyProperty.reviews.average ?  hostfullyProperty.reviews.average.toFixed(2) : 0.00;

        const hostfullyData = {
            name: hostfullyProperty.name,
            public_name:hostfullyPropertyDescription[0].name,
            notes:hostfullyPropertyDescription[0].notes,
            lawn:"false",
            exterminator: "false",
            insurance: "false",
            maintenance: "Rob Kennison",
            consumables: "false",
            video: "",
            oporto: 0,
            email: hostfullyPropertyOwner.email,
            phone: this.formatPhoneNumber(hostfullyPropertyOwner.phoneNumber),
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
            wifi_ssid: hostfullyProperty.wifiNetwork,
            wifi_password: hostfullyProperty.wifiPassword,
            hostfully: hostfullyProperty.webLink,
            airbnb: hostfullyProperty.listingLinks.airbnbUrl,
            vrbo: hostfullyProperty.listingLinks.homeAwayUrl,
            bookingCom: hostfullyProperty.listingLinks.bookingDotComUrl,
            image: hostfullyProperty.picture,
            beds: hostfullyProperty.bedCount,
            reviews: hostfullyProperty.reviews.total,
            rating: avgRating,
            hostfully_id: hostfullyProperty.uid,
            objectID: hostfullyProperty.uid 
        }

        const hostfullyCustomData = await this.getHostfullyData(this.configService.get<string>('HOSTFULL_API_URL')+"customdata?propertyUid="+hostfullyID) ;
        if (hostfullyCustomData) {
            const tier = hostfullyCustomData.find(item => item.customDataField.name=== "Tier")
            if (tier.text) {
                hostfullyData['tier'] =  tier.text;
            }
        }

        return(hostfullyData);
    }



    private async getHostfullyData(url) {
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

    private formatPhoneNumber(phoneNumberString) {
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
        var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
          return match[1] + '-' + match[2] + '-' + match[3];
        }
        return null;
      }


}
