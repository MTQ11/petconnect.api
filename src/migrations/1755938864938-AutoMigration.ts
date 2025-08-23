import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1755938864938 implements MigrationInterface {
    name = 'AutoMigration1755938864938'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "favorite_pets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_by" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" uuid, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_by" uuid, "deleted_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid NOT NULL, "pet_id" uuid NOT NULL, CONSTRAINT "PK_ba736df8ff6c4da8a6eaad47e67" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "favorite_pets" ADD CONSTRAINT "FK_98117fa71cfc17dbdca1b8e5a1e" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorite_pets" ADD CONSTRAINT "FK_b89b8bbaedd41882b7e2ed2a54f" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorite_pets" DROP CONSTRAINT "FK_b89b8bbaedd41882b7e2ed2a54f"`);
        await queryRunner.query(`ALTER TABLE "favorite_pets" DROP CONSTRAINT "FK_98117fa71cfc17dbdca1b8e5a1e"`);
        await queryRunner.query(`DROP TABLE "favorite_pets"`);
    }

}
