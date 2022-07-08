import { Column, Entity, PrimaryGeneratedColumn, BeforeUpdate } from "typeorm";

@Entity({name:'clients'})
export class ClientEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;
    
    @Column()
    status: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date;
    
    @BeforeUpdate()
    updateTimestamp() {
        this.updatedAt = new Date();
    }
}