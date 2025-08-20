import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1755622735714 implements MigrationInterface {
    name = 'AutoMigration1755622735714'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pets" ADD "weight" double precision`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pets" DROP COLUMN "weight"`);
    }

}
