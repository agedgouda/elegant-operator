import {  Injectable } from '@nestjs/common';

@Injectable()
export class HellosignService {
    agreementSigned(): any {
        return 'hello, chico';
    }
}
