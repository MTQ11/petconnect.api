import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1757779818621 implements MigrationInterface {
    name = 'AutoMigration1757779818621'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "google_id" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "zalo_id" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" DROP NOT NULL`);
        await queryRunner.query(`ALTER TYPE "public"."user_social_login_enum" RENAME TO "user_social_login_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."user_social_login_enum" AS ENUM('all', 'google', 'zalo', 'local')`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "social_login" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "social_login" TYPE "public"."user_social_login_enum" USING "social_login"::"text"::"public"."user_social_login_enum"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "social_login" SET DEFAULT 'local'`);
        await queryRunner.query(`DROP TYPE "public"."user_social_login_enum_old"`);
        await queryRunner.query(`ALTER TABLE "user_site" ALTER COLUMN "layout_config" SET DEFAULT '{"sections":[{"type":"header","logoUrl":"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fwebsite-logo-png&psig=AOvVaw0ufT0LXv7cNZYPkwfHPHpW&ust=1756999013682000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCPiN6cfxvI8DFQAAAAAdAAAAABAK","businessName":"My Pet Shop"},{"type":"hero","title":"Welcome to My Pet Site","subtitle":"Discover amazing pets","imageUrls":[]},{"type":"pet_list","isPetFilter":true,"species":[],"breed":[]},{"type":"about","title":"About Me","content":"This is a default about section."},{"type":"footer","phone":"0123-456-789","email":"user@example.com"}]}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_site" ALTER COLUMN "layout_config" SET DEFAULT '{"sections":[{"type":"hero","title":"Welcome to My Pet Site","subtitle":"Discover amazing pets","images":[]},{"type":"pet_list","isPetFilter":true,"species":[],"breed":[]},{"type":"footer","phone":"0123-456-789","email":"user@example.com"}]}'`);
        await queryRunner.query(`CREATE TYPE "public"."user_social_login_enum_old" AS ENUM('google', 'facebook', 'zalo', 'local')`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "social_login" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "social_login" TYPE "public"."user_social_login_enum_old" USING "social_login"::"text"::"public"."user_social_login_enum_old"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "social_login" SET DEFAULT 'local'`);
        await queryRunner.query(`DROP TYPE "public"."user_social_login_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."user_social_login_enum_old" RENAME TO "user_social_login_enum"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "zalo_id"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "google_id"`);
    }

}
