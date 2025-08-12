import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1755017427572 implements MigrationInterface {
    name = 'AutoMigration1755017427572'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pets" ADD "images" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pets" DROP COLUMN "images"`);
    }

}
