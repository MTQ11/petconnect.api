import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1754926648668 implements MigrationInterface {
    name = 'AutoMigration1754926648668'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "species" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "species" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "breeds" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "breeds" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "species" ADD "name_vi" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "species" ADD "name_en" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "species" ADD "image_url" character varying`);
        await queryRunner.query(`ALTER TABLE "species" ADD "description_vi" character varying`);
        await queryRunner.query(`ALTER TABLE "species" ADD "description_en" character varying`);
        await queryRunner.query(`ALTER TABLE "breeds" ADD "name_vi" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "breeds" ADD "name_en" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "breeds" ADD "image_url" character varying`);
        await queryRunner.query(`ALTER TABLE "breeds" ADD "description_vi" character varying`);
        await queryRunner.query(`ALTER TABLE "breeds" ADD "description_en" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "breeds" DROP COLUMN "description_en"`);
        await queryRunner.query(`ALTER TABLE "breeds" DROP COLUMN "description_vi"`);
        await queryRunner.query(`ALTER TABLE "breeds" DROP COLUMN "image_url"`);
        await queryRunner.query(`ALTER TABLE "breeds" DROP COLUMN "name_en"`);
        await queryRunner.query(`ALTER TABLE "breeds" DROP COLUMN "name_vi"`);
        await queryRunner.query(`ALTER TABLE "species" DROP COLUMN "description_en"`);
        await queryRunner.query(`ALTER TABLE "species" DROP COLUMN "description_vi"`);
        await queryRunner.query(`ALTER TABLE "species" DROP COLUMN "image_url"`);
        await queryRunner.query(`ALTER TABLE "species" DROP COLUMN "name_en"`);
        await queryRunner.query(`ALTER TABLE "species" DROP COLUMN "name_vi"`);
        await queryRunner.query(`ALTER TABLE "breeds" ADD "description" character varying`);
        await queryRunner.query(`ALTER TABLE "breeds" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "species" ADD "description" character varying`);
        await queryRunner.query(`ALTER TABLE "species" ADD "name" character varying NOT NULL`);
    }

}
