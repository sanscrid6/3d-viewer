import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1702680072303 implements MigrationInterface {
    name = 'Init1702680072303'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "balance" TYPE numeric(100,2)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "balance" TYPE numeric(2,0)`);
    }

}
