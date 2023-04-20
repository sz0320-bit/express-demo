"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUsers1676752655985 = void 0;
class AddUsers1676752655985 {
    async up(queryRunner) {
        await queryRunner.query(`INSERT INTO "users" ("profile_pic", "date_created", "date_updated", "last_online") VALUES ('https://example.com/profile1.jpg', NOW(), NOW(), NOW())`);
        await queryRunner.query(`INSERT INTO "users" ("profile_pic", "date_created", "date_updated", "last_online") VALUES ('https://example.com/profile2.jpg', NOW(), NOW(), NOW())`);
        await queryRunner.query(`INSERT INTO "users" ("profile_pic", "date_created", "date_updated", "last_online") VALUES ('https://example.com/profile3.jpg', NOW(), NOW(), NOW())`);
    }
    async down(queryRunner) {
    }
}
exports.AddUsers1676752655985 = AddUsers1676752655985;
