import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1702672694130 implements MigrationInterface {
    name = 'Init1702672694130'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "location" RENAME COLUMN "isPayed" TO "isPublic"`);
        await queryRunner.query(`CREATE TABLE "payment" ("hash" character varying NOT NULL, "from" character varying NOT NULL, "to" character varying NOT NULL, "amount" integer NOT NULL, CONSTRAINT "PK_36ce28e7d1f417c8f835d257a62" PRIMARY KEY ("hash"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "balance" numeric(2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "user" ADD "hashes" text array NOT NULL DEFAULT '{}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "hashes"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "balance"`);
        await queryRunner.query(`DROP TABLE "payment"`);
        await queryRunner.query(`ALTER TABLE "location" RENAME COLUMN "isPublic" TO "isPayed"`);
    }

}
