import { IsNotEmpty} from "class-validator";

export class SignedAgreementDto {
    @IsNotEmpty()
    readonly emailAddress: string;
    
    @IsNotEmpty()
    readonly emailRecipient: string;
    
    @IsNotEmpty()
    readonly signature_id: string;


}