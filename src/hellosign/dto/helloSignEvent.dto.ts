import { IsNotEmpty, ValidateNested } from "class-validator";

export class HelloSignEventDto {
    //@IsNotEmpty()
    readonly event_type: string;
    
    //@IsNotEmpty()
    readonly event_time: string;
    
    //@IsNotEmpty()
    readonly event_hash: string;

    
    //@IsNotEmpty()
    readonly event_metadata: string;

}