import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1754494318343 implements MigrationInterface {
    name = 'AutoMigration1754494318343'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_by" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" uuid, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_by" uuid, "deleted_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "phone" character varying NOT NULL, "email" character varying NOT NULL, "avatar" character varying, "rating" double precision DEFAULT '0', "social_login" "public"."user_social_login_enum" DEFAULT 'local', "address" character varying, CONSTRAINT "UQ_8e1f623798118e629b46a9e6299" UNIQUE ("phone"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "species" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_by" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" uuid, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_by" uuid, "deleted_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying, CONSTRAINT "PK_ae6a87f2423ba6c25dc43c32770" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reviews" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_by" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" uuid, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_by" uuid, "deleted_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid NOT NULL, "target_user_id" uuid NOT NULL, "rating" double precision NOT NULL, "comment" text NOT NULL, CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "breeds" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_by" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" uuid, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_by" uuid, "deleted_at" TIMESTAMP NOT NULL DEFAULT now(), "species_id" uuid NOT NULL, "name" character varying NOT NULL, "description" character varying, CONSTRAINT "PK_e89f6e1fbb29d28623b4feb2b3e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."pets_gender_enum" AS ENUM('male', 'female')`);
        await queryRunner.query(`CREATE TABLE "pets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_by" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" uuid, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_by" uuid, "deleted_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "age" integer NOT NULL, "gender" "public"."pets_gender_enum" NOT NULL, "description" character varying NOT NULL, "vaccinated" boolean NOT NULL DEFAULT false, "species_id" uuid NOT NULL, "breed_id" uuid, "custom_breed_name" character varying, "price" double precision, "rating" double precision DEFAULT '0', CONSTRAINT "PK_d01e9e7b4ada753c826720bee8b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."posts_status_enum" AS ENUM('draft', 'published', 'closed')`);
        await queryRunner.query(`CREATE TABLE "posts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_by" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" uuid, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_by" uuid, "deleted_at" TIMESTAMP NOT NULL DEFAULT now(), "content" text NOT NULL, "images" text, "user_id" uuid NOT NULL, "location" character varying, "status" "public"."posts_status_enum" NOT NULL DEFAULT 'draft', CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."reports_target_type_enum" AS ENUM('POST', 'USER', 'PET')`);
        await queryRunner.query(`CREATE TYPE "public"."reports_status_enum" AS ENUM('PENDING', 'APPROVED', 'REJECTED')`);
        await queryRunner.query(`CREATE TABLE "reports" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_by" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" uuid, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_by" uuid, "deleted_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid NOT NULL, "reporter_id" uuid NOT NULL, "target_type" "public"."reports_target_type_enum" NOT NULL, "target_id" uuid NOT NULL, "reason" text NOT NULL, "status" "public"."reports_status_enum" NOT NULL DEFAULT 'PENDING', CONSTRAINT "PK_d9013193989303580053c0b5ef6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_by" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" uuid, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_by" uuid, "deleted_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid NOT NULL, "post_id" uuid NOT NULL, "content" text NOT NULL, "parent_id" uuid, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post_pets" ("post_id" uuid NOT NULL, "pet_id" uuid NOT NULL, CONSTRAINT "PK_18dcca05a9e5d9f739a95477b64" PRIMARY KEY ("post_id", "pet_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_63fea9ef3d8510cba36387eb31" ON "post_pets" ("post_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_a3a67721d32fae363cead74136" ON "post_pets" ("pet_id") `);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_728447781a30bc3fcfe5c2f1cdf" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_c1d3f9f3fc7d276a0eb0837ec95" FOREIGN KEY ("target_user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "breeds" ADD CONSTRAINT "FK_0ea3bf7a9569bb26556fb5a7fb2" FOREIGN KEY ("species_id") REFERENCES "species"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pets" ADD CONSTRAINT "FK_bf445ad6aa656e5953c4e90c5a0" FOREIGN KEY ("species_id") REFERENCES "species"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pets" ADD CONSTRAINT "FK_478d65b6063e614271e7d4bebad" FOREIGN KEY ("breed_id") REFERENCES "breeds"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_c4f9a7bd77b489e711277ee5986" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reports" ADD CONSTRAINT "FK_ca7a21eb95ca4625bd5eaef7e0c" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reports" ADD CONSTRAINT "FK_9459b9bf907a3807ef7143d2ead" FOREIGN KEY ("reporter_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_259bf9825d9d198608d1b46b0b5" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_d6f93329801a93536da4241e386" FOREIGN KEY ("parent_id") REFERENCES "comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post_pets" ADD CONSTRAINT "FK_63fea9ef3d8510cba36387eb31c" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "post_pets" ADD CONSTRAINT "FK_a3a67721d32fae363cead74136c" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post_pets" DROP CONSTRAINT "FK_a3a67721d32fae363cead74136c"`);
        await queryRunner.query(`ALTER TABLE "post_pets" DROP CONSTRAINT "FK_63fea9ef3d8510cba36387eb31c"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_d6f93329801a93536da4241e386"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_259bf9825d9d198608d1b46b0b5"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d"`);
        await queryRunner.query(`ALTER TABLE "reports" DROP CONSTRAINT "FK_9459b9bf907a3807ef7143d2ead"`);
        await queryRunner.query(`ALTER TABLE "reports" DROP CONSTRAINT "FK_ca7a21eb95ca4625bd5eaef7e0c"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_c4f9a7bd77b489e711277ee5986"`);
        await queryRunner.query(`ALTER TABLE "pets" DROP CONSTRAINT "FK_478d65b6063e614271e7d4bebad"`);
        await queryRunner.query(`ALTER TABLE "pets" DROP CONSTRAINT "FK_bf445ad6aa656e5953c4e90c5a0"`);
        await queryRunner.query(`ALTER TABLE "breeds" DROP CONSTRAINT "FK_0ea3bf7a9569bb26556fb5a7fb2"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_c1d3f9f3fc7d276a0eb0837ec95"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_728447781a30bc3fcfe5c2f1cdf"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a3a67721d32fae363cead74136"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_63fea9ef3d8510cba36387eb31"`);
        await queryRunner.query(`DROP TABLE "post_pets"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "reports"`);
        await queryRunner.query(`DROP TYPE "public"."reports_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."reports_target_type_enum"`);
        await queryRunner.query(`DROP TABLE "posts"`);
        await queryRunner.query(`DROP TYPE "public"."posts_status_enum"`);
        await queryRunner.query(`DROP TABLE "pets"`);
        await queryRunner.query(`DROP TYPE "public"."pets_gender_enum"`);
        await queryRunner.query(`DROP TABLE "breeds"`);
        await queryRunner.query(`DROP TABLE "reviews"`);
        await queryRunner.query(`DROP TABLE "species"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
