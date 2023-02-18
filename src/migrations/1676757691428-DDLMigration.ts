import { MigrationInterface, QueryRunner } from "typeorm"

export class DDLMigration1676757691428 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Drop the existing username column
        await queryRunner.query("ALTER TABLE users DROP COLUMN username");
        await queryRunner.query(`DELETE FROM "users"`);
        await queryRunner.query(`INSERT INTO "users" ("profile_pic", "date_created", "date_updated", "last_online", "username") VALUES ('https://example.com/profile1.jpg', NOW(), NOW(), NOW(), 'sz0320')`);
        await queryRunner.query(`INSERT INTO "users" ("profile_pic", "date_created", "date_updated", "last_online", "username") VALUES ('https://example.com/profile1.jpg', NOW(), NOW(), NOW(), 'yknse')`);
        await queryRunner.query(`INSERT INTO "users" ("profile_pic", "date_created", "date_updated", "last_online", "username") VALUES ('https://example.com/profile1.jpg', NOW(), NOW(), NOW(), 'test-user')`);

        // Add the username column back with a string type and nullable constraint
        await queryRunner.query("ALTER TABLE users ADD COLUMN username VARCHAR(255) NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop the new username column
        await queryRunner.query("ALTER TABLE users DROP COLUMN username");

        // Add the original username column back with a string type and not nullable constraint
        await queryRunner.query("ALTER TABLE users ADD COLUMN username VARCHAR(255) NOT NULL");
    }

}
