"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddDummyUserData1676741252299 = void 0;
class AddDummyUserData1676741252299 {
    async up(queryRunner) {
        await queryRunner.query(`INSERT INTO "users" ("profile_pic", "date_created", "date_updated", "last_online") VALUES ('https://example.com/profile1.jpg', NOW(), NOW(), NOW())`);
        await queryRunner.query(`INSERT INTO "users" ("profile_pic", "date_created", "date_updated", "last_online") VALUES ('https://example.com/profile1.jpg', NOW(), NOW(), NOW())`);
        await queryRunner.query(`INSERT INTO "users" ("profile_pic", "date_created", "date_updated", "last_online") VALUES ('https://example.com/profile1.jpg', NOW(), NOW(), NOW())`);
        await queryRunner.query(`INSERT INTO "users" ("profile_pic", "date_created", "date_updated", "last_online") VALUES ('https://example.com/profile1.jpg', NOW(), NOW(), NOW())`);
        await queryRunner.query(`INSERT INTO "users" ("profile_pic", "date_created", "date_updated", "last_online") VALUES ('https://example.com/profile1.jpg', NOW(), NOW(), NOW())`);
        await queryRunner.query(`INSERT INTO "users" ("profile_pic", "date_created", "date_updated", "last_online") VALUES ('https://example.com/profile1.jpg', NOW(), NOW(), NOW())`);
        await queryRunner.query(`INSERT INTO "users" ("profile_pic", "date_created", "date_updated", "last_online") VALUES ('https://example.com/profile1.jpg', NOW(), NOW(), NOW())`);
        await queryRunner.query(`INSERT INTO "users" ("profile_pic", "date_created", "date_updated", "last_online") VALUES ('https://example.com/profile1.jpg', NOW(), NOW(), NOW())`);
        await queryRunner.query(`INSERT INTO "users" ("profile_pic", "date_created", "date_updated", "last_online") VALUES ('https://example.com/profile1.jpg', NOW(), NOW(), NOW())`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DELETE FROM users`);
    }
}
exports.AddDummyUserData1676741252299 = AddDummyUserData1676741252299;
