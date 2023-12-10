import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1702233501960 implements MigrationInterface {
    name = 'Init1702233501960'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "point" DROP CONSTRAINT "FK_4e7b5ca4ca3f63f2eceddd8dfc3"`);
        await queryRunner.query(`ALTER TABLE "point" RENAME COLUMN "pointId" TO "locationId"`);
        await queryRunner.query(`ALTER TABLE "point" ADD CONSTRAINT "FK_9cb6485ef7133de7d6a722c33cd" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "point" DROP CONSTRAINT "FK_9cb6485ef7133de7d6a722c33cd"`);
        await queryRunner.query(`ALTER TABLE "point" RENAME COLUMN "locationId" TO "pointId"`);
        await queryRunner.query(`ALTER TABLE "point" ADD CONSTRAINT "FK_4e7b5ca4ca3f63f2eceddd8dfc3" FOREIGN KEY ("pointId") REFERENCES "location"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
