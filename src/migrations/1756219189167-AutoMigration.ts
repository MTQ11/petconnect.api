import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1756219189167 implements MigrationInterface {
    name = 'AutoMigration1756219189167'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "description" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "verified" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('user', 'admin', 'breeder')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "role" "public"."user_role_enum" NOT NULL DEFAULT 'user'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "verified"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "description"`);
    }

}
