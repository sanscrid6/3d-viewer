import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1702203388973 implements MigrationInterface {
    name = 'Init1702203388973'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "location" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "payed" boolean NOT NULL, "userId" uuid, CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "point" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "x" integer NOT NULL, "y" integer NOT NULL, "z" integer NOT NULL, "number" integer NOT NULL, "pointId" uuid, CONSTRAINT "PK_391f59a9491a08961038a615371" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "visit_stat" ("id" SERIAL NOT NULL, "timestamp" TIMESTAMP NOT NULL, "pointId" uuid, CONSTRAINT "PK_497eb1a9dfb43ba6d4bf08b1706" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "duration_stat" ("id" SERIAL NOT NULL, "timestamp" TIMESTAMP NOT NULL, "duration" integer NOT NULL, "pointId" uuid, CONSTRAINT "PK_adbe3da31ec9188b3b4071a1df0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "location" ADD CONSTRAINT "FK_bdef5f9d46ef330ddca009a8596" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "point" ADD CONSTRAINT "FK_4e7b5ca4ca3f63f2eceddd8dfc3" FOREIGN KEY ("pointId") REFERENCES "location"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "visit_stat" ADD CONSTRAINT "FK_e12df8a0d59310e0a0d56221fc7" FOREIGN KEY ("pointId") REFERENCES "point"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "duration_stat" ADD CONSTRAINT "FK_1dc7f5fc034f7ec9ee09cdbe510" FOREIGN KEY ("pointId") REFERENCES "point"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "duration_stat" DROP CONSTRAINT "FK_1dc7f5fc034f7ec9ee09cdbe510"`);
        await queryRunner.query(`ALTER TABLE "visit_stat" DROP CONSTRAINT "FK_e12df8a0d59310e0a0d56221fc7"`);
        await queryRunner.query(`ALTER TABLE "point" DROP CONSTRAINT "FK_4e7b5ca4ca3f63f2eceddd8dfc3"`);
        await queryRunner.query(`ALTER TABLE "location" DROP CONSTRAINT "FK_bdef5f9d46ef330ddca009a8596"`);
        await queryRunner.query(`DROP TABLE "duration_stat"`);
        await queryRunner.query(`DROP TABLE "visit_stat"`);
        await queryRunner.query(`DROP TABLE "point"`);
        await queryRunner.query(`DROP TABLE "location"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
