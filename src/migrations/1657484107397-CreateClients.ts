import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateClients1657484107397 implements MigrationInterface {
    name = 'CreateClients1657484107397'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "clients" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "status" character varying NOT NULL, "signature_id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "signature_id"`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "signature_id" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "signature_id"`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "signature_id" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "clients"`);
    }

}
