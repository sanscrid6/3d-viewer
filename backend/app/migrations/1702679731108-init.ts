import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1702679731108 implements MigrationInterface {
    name = 'Init1702679731108'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" ALTER COLUMN "amount" TYPE numeric(100,2)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" ALTER COLUMN "amount" TYPE numeric(2,0)`);
    }

}
