import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1702216658723 implements MigrationInterface {
    name = 'Init1702216658723'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "location" RENAME COLUMN "payed" TO "isPayed"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "salt" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "location" ALTER COLUMN "description" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "location" ALTER COLUMN "isPayed" SET DEFAULT false`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_e12875dfb3b1d92d7d7c5377e2"`);
        await queryRunner.query(`ALTER TABLE "location" ALTER COLUMN "isPayed" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "location" ALTER COLUMN "description" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "salt"`);
        await queryRunner.query(`ALTER TABLE "location" RENAME COLUMN "isPayed" TO "payed"`);
    }

}
