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
        const status =  this.mailHandlerService.agreementSigned(signedAgreementDto);
        return status;
    } 

    @Post('test_message')
    testMessage(
        @Body('signerInfo') signedAgreementDto:SignedAgreementDto
    ):any {
        
        const tester =  this.mailHandlerService.testMail(signedAgreementDto.emailAddress,
            signedAgreementDto.emailRecipient,
            'scheduleOnboardingMeeting',
            'Welcome to Elegance.Rent, Let\'s finalize onboarding!');
        
        return tester;
    }  

}
