import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1702233992940 implements MigrationInterface {
    name = 'Init1702233992940'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "point" DROP COLUMN "x"`);
        await queryRunner.query(`ALTER TABLE "point" ADD "x" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "point" DROP COLUMN "y"`);
        await queryRunner.query(`ALTER TABLE "point" ADD "y" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "point" DROP COLUMN "z"`);
        await queryRunner.query(`ALTER TABLE "point" ADD "z" double precision NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "point" DROP COLUMN "z"`);
        await queryRunner.query(`ALTER TABLE "point" ADD "z" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "point" DROP COLUMN "y"`);
        await queryRunner.query(`ALTER TABLE "point" ADD "y" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "point" DROP COLUMN "x"`);
        await queryRunner.query(`ALTER TABLE "point" ADD "x" integer NOT NULL`);
    }

}
