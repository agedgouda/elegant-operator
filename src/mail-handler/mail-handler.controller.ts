import { Body, Controller, Post } from '@nestjs/common';
import { SignedAgreementDto } from './dto/signedAgreement.dto';
import { MailHandlerService } from './mail-handler.service';

@Controller('mail-handler')
export class MailHandlerController {
    constructor( private readonly mailHandlerService:MailHandlerService ) {}
    //public constructor(@InjectMailchimp() private readonly client: Client) {}

    @Post('agreement_signed')
    agreementSigned(
        @Body('signerInfo') signedAgreementDto:SignedAgreementDto
    ) {
        //return signedAgreementDto.emailAddress;
        const status =  this.mailHandlerService.agreementSigned(signedAgreementDto);
        //console.log(status)
        return status;
    } 

}
