import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1702242088010 implements MigrationInterface {
    name = 'Init1702242088010'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "location" ADD "previewUrl" character varying NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "previewUrl"`);
    }

}
