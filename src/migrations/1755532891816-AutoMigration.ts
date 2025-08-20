import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1755532891816 implements MigrationInterface {
    name = 'AutoMigration1755532891816'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pets" DROP CONSTRAINT "FK_4ddf2615c9d24b5be6d26830b4b"`);
        await queryRunner.query(`ALTER TABLE "pets" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "pets" ADD "age_unit" character varying NOT NULL DEFAULT 'year'`);
        await queryRunner.query(`ALTER TABLE "pets" ADD "is_for_rehoming" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "pets" ADD "transaction_type" character varying NOT NULL DEFAULT 'not_sell'`);
        await queryRunner.query(`ALTER TABLE "pets" ADD "view" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "pets" ADD "owner_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pets" ALTER COLUMN "vaccinated" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "pets" ADD CONSTRAINT "FK_d6c565fded8031d4cdd54fe1043" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pets" DROP CONSTRAINT "FK_d6c565fded8031d4cdd54fe1043"`);
        await queryRunner.query(`ALTER TABLE "pets" ALTER COLUMN "vaccinated" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "pets" DROP COLUMN "owner_id"`);
        await queryRunner.query(`ALTER TABLE "pets" DROP COLUMN "view"`);
        await queryRunner.query(`ALTER TABLE "pets" DROP COLUMN "transaction_type"`);
        await queryRunner.query(`ALTER TABLE "pets" DROP COLUMN "is_for_rehoming"`);
        await queryRunner.query(`ALTER TABLE "pets" DROP COLUMN "age_unit"`);
        await queryRunner.query(`ALTER TABLE "pets" ADD "user_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pets" ADD CONSTRAINT "FK_4ddf2615c9d24b5be6d26830b4b" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
