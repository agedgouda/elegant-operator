import {
    BeforeUpdate,
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
@Entity({name:'properties'})
export class PropertyEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({default: ''})
    description: string;

    @Column({default: ''})
    body: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date;

    @Column('simple-array')
    tagList: string[];

    @Column({default:0})
    favoritesCount: number;

    @BeforeUpdate()
    updateTimestamp() {
        this.updatedAt = new Date();
    }

}