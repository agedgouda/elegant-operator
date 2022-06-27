import { IsNotEmpty} from "class-validator";

export class SignedAgreementDto {
    @IsNotEmpty()
    readonly emailAddress: string;
    
    @IsNotEmpty()
    readonly emailRecipient: string;


}