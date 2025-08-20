import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1755100142468 implements MigrationInterface {
    name = 'AutoMigration1755100142468'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pets" ADD "user_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pets" ADD CONSTRAINT "FK_4ddf2615c9d24b5be6d26830b4b" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pets" DROP CONSTRAINT "FK_4ddf2615c9d24b5be6d26830b4b"`);
        await queryRunner.query(`ALTER TABLE "pets" DROP COLUMN "user_id"`);
    }

}
