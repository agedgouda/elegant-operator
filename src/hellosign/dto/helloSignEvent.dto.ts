import { IsNotEmpty } from "class-validator";

export class HelloSignEvent {
    //@IsNotEmpty()
    readonly event_type: string;
    
    //@IsNotEmpty()
    readonly event_time: string;
    
    //@IsNotEmpty()
    readonly event_hash: string;

    
    //@IsNotEmpty()
    readonly event_metadata: string;




    //{"event":{"event_metadata":{"related_signature_id":null,"reported_for_account_id":"b38fda95a55ace9f4e17ac0a801fb3458a26d9bc","reported_for_app_id":null,"event_message":null}}}



}