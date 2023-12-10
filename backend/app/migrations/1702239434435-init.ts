import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1702239434435 implements MigrationInterface {
    name = 'Init1702239434435'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "duration_stat" DROP COLUMN "timestamp"`);
        await queryRunner.query(`ALTER TABLE "duration_stat" ADD "timestamp" double precision NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "duration_stat" DROP COLUMN "timestamp"`);
        await queryRunner.query(`ALTER TABLE "duration_stat" ADD "timestamp" TIMESTAMP NOT NULL`);
    }

}
