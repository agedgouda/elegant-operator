import { IsNotEmpty, IsEmail } from "class-validator";

export class CreateClientDto {
    @IsNotEmpty()
    @IsEmail()
    readonly client_email: string;

    @IsNotEmpty()
    readonly status: string;

    @IsNotEmpty()
    readonly signature_id: string;

}