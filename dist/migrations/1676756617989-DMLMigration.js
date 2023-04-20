"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DMLMigration1676756617989 = void 0;
class DMLMigration1676756617989 {
    async up(queryRunner) {
        await queryRunner.query(`DELETE FROM "users"`);
        await queryRunner.query(`
                ALTER TABLE users 
                ADD COLUMN username VARCHAR(255) NOT NULL;
            `);
        await queryRunner.query(`INSERT INTO "users" ("profile_pic", "date_created", "date_updated", "last_online", "username") VALUES ('https://example.com/profile1.jpg', NOW(), NOW(), NOW(), 'sz0320')`);
        await queryRunner.query(`INSERT INTO "users" ("profile_pic", "date_created", "date_updated", "last_online", "username") VALUES ('https://example.com/profile1.jpg', NOW(), NOW(), NOW(), 'yknse')`);
        await queryRunner.query(`INSERT INTO "users" ("profile_pic", "date_created", "date_updated", "last_online", "username") VALUES ('https://example.com/profile1.jpg', NOW(), NOW(), NOW(), 'tester123')`);
    }
    async down(queryRunner) {
    }
}
exports.DMLMigration1676756617989 = DMLMigration1676756617989;
