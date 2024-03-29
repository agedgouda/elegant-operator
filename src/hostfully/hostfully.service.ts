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

    async getAllProperties() {
        
        const hostfullyProperties = await this.getHostfullyData(this.configService.get<string>('HOSTFULL_API_URL')+"properties?agencyUid=a47ce045-02eb-42fb-87f4-100a6be94f49&limit=50") 
        
        hostfullyProperties.propertiesUids.forEach(hostfullyID => {
            const hostfullyProperty = this.getHostfullyProperty(hostfullyID).then(
                (property) => {
                    const public_name = property.public_name;
                    console.log(property.objectID,',',property.public_name)
                }
            );

        });
        return hostfullyProperties;
    }

    async deleteHostfullyProperty(hostfullyID) {
        const index = await this.algoliaService.initIndex(this.configService.get<string>('ALGOLIA_INDEX'));
        const algoliaDelete = await index.deleteObject(hostfullyID);
        console.log(algoliaDelete);
        return algoliaDelete;

    }

    async addHostfullyProperty(hostfullyID) {
        const hostfullyData = await this.getHostfullyProperty(hostfullyID);
        const index = await this.algoliaService.initIndex(this.configService.get<string>('ALGOLIA_INDEX'));
        const algoliaSave = await index.saveObject(hostfullyData);
        console.log(algoliaSave);
        return algoliaSave;

    }

    async algoliaTest() {
        const index = await this.algoliaService.initIndex(this.configService.get<string>('ALGOLIA_INDEX'));
        const ollie = await index.search('',{hitsPerPage: 71}) 
        console.log(ollie)
        return index;
    }


    private async getHostfullyProperty(hostfullyID) {
        const hostfullyProperty = await this.getHostfullyData(this.configService.get<string>('HOSTFULL_API_URL')+"properties/"+hostfullyID) ;
        const hostfullyPropertyOwnership = await this.getHostfullyData(this.configService.get<string>('HOSTFULL_API_URL')+"propertyownership/"+hostfullyID) ;
        const hostfullyPropertyOwner = await this.getHostfullyData(this.configService.get<string>('HOSTFULL_API_URL')+"owners/"+hostfullyPropertyOwnership.ownerUid) ;
        const hostfullyPropertyAmmenities = await this.getHostfullyData(this.configService.get<string>('HOSTFULL_API_URL')+"amenities/"+hostfullyID) ;
        const hostfullyPropertyDescription = await this.getHostfullyData(this.configService.get<string>('HOSTFULL_API_URL')+"propertydescriptions?propertyUid="+hostfullyID) ;
        const avgRating = hostfullyProperty.reviews.average ?  hostfullyProperty.reviews.average.toFixed(2) : 0.00;

        const hostfullyData = {
            name: hostfullyProperty.name,
            public_name:hostfullyPropertyDescription[0].name,
            notes:hostfullyPropertyDescription[0].notes,
            exterminator: "false",
            insurance: "false",
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
            const tier = hostfullyCustomData.find(item => item.customDataField.name === "Tier")
            if (tier) {
                hostfullyData['tier'] =  tier.text;
            } else {
                hostfullyData['tier'] =   "Premium";
            }
            const maintenance = hostfullyCustomData.find(item => item.customDataField.name === "Maintenance")
            if (maintenance) {
                hostfullyData['maintenance'] =  maintenance.text;
            } else {
                hostfullyData['maintenance'] =   "Rob Kennison";
            }
            const lawn = hostfullyCustomData.find(item => item.customDataField.name === "Lawn")
            if (lawn && lawn !== '' ) {
                hostfullyData['lawn'] =  lawn.text;
            } else {
                hostfullyData['lawn'] =   "false";
            }
            const consumables = hostfullyCustomData.find(item => item.customDataField.name === "Consumables")
            if (consumables && consumables !== '' ) {
                hostfullyData['consumables'] =  consumables.text;
            } else {
                hostfullyData['consumables'] =   "false";
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
