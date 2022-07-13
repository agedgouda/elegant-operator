import { Injectable } from '@nestjs/common';

@Injectable()
export class HostfullyService {
    hostfullyPropertyUpdate(hostfullyID) {
       console.log('hostfully is go!',hostfullyID) ;
       return 'we are in';
    }}
