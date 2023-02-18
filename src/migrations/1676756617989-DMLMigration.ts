import { MigrationInterface, QueryRunner } from "typeorm"

export class DMLMigration1676756617989 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "users"`);
        await queryRunner.query(`
                ALTER TABLE users 
                ADD COLUMN username VARCHAR(255) NOT NULL;
            `);
        await queryRunner.query(`INSERT INTO "users" ("profile_pic", "date_created", "date_updated", "last_online", "username") VALUES ('https://example.com/profile1.jpg', NOW(), NOW(), NOW(), 'sz0320')`);
        await queryRunner.query(`INSERT INTO "users" ("profile_pic", "date_created", "date_updated", "last_online", "username") VALUES ('https://example.com/profile1.jpg', NOW(), NOW(), NOW(), 'yknse')`);
        await queryRunner.query(`INSERT INTO "users" ("profile_pic", "date_created", "date_updated", "last_online", "username") VALUES ('https://example.com/profile1.jpg', NOW(), NOW(), NOW(), 'tester123')`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
