import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1754581208936 implements MigrationInterface {
    name = 'AutoMigration1754581208936'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
    }

}
