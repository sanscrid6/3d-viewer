import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1702239474108 implements MigrationInterface {
    name = 'Init1702239474108'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "duration_stat" DROP COLUMN "timestamp"`);
        await queryRunner.query(`ALTER TABLE "duration_stat" ADD "timestamp" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "duration_stat" DROP COLUMN "duration"`);
        await queryRunner.query(`ALTER TABLE "duration_stat" ADD "duration" double precision NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "duration_stat" DROP COLUMN "duration"`);
        await queryRunner.query(`ALTER TABLE "duration_stat" ADD "duration" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "duration_stat" DROP COLUMN "timestamp"`);
        await queryRunner.query(`ALTER TABLE "duration_stat" ADD "timestamp" double precision NOT NULL`);
    }

}
