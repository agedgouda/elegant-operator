import { Body, Controller, Post } from '@nestjs/common';
import { SignedAgreementDto } from './dto/signedAgreement.dto';
import { MailHandlerService } from './mail-handler.service';

@Controller('mail-handler')
export class MailHandlerController {
    constructor( private readonly mailHandlerService:MailHandlerService ) {}
    //public constructor(@InjectMailchimp() private readonly client: Client) {}

    @Post('agreement_signed')
    agreementSigned(
        @Body('signer') signedAgreementDto:SignedAgreementDto
    ) {
        //return signedAgreementDto.emailAddress;
        const status =  this.mailHandlerService.agreementSigned(signedAgreementDto.emailAddress,signedAgreementDto.emailRecipient);
        //console.log(status)
        return status;
    } 

}
