import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1756827181184 implements MigrationInterface {
    name = 'AutoMigration1756827181184'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_site" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_by" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" uuid, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_by" uuid, "deleted_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid NOT NULL, "sub_domain" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "layout_config" json DEFAULT '{"section":[{"type":"hero","title":"Welcome to My Pet Site","subtitle":"Discover amazing pets","images":[]},{"type":"pet_list","isPetFilter":true,"species":[],"breed":[]},{"type":"footer","phone":"0123-456-789","email":"user@example.com"}]}', CONSTRAINT "PK_89798d5654ea24c7c42edf96f48" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pets" ADD "is_available_at_site" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "user_site" ADD CONSTRAINT "FK_89345e46cca4af1b853024df84d" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_site" DROP CONSTRAINT "FK_89345e46cca4af1b853024df84d"`);
        await queryRunner.query(`ALTER TABLE "pets" DROP COLUMN "is_available_at_site"`);
        await queryRunner.query(`DROP TABLE "user_site"`);
    }

}
