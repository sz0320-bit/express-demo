"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserTimestampColumn1676744717064 = void 0;
class UpdateUserTimestampColumn1676744717064 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "date_created" TYPE timestamp with time zone USING "date_created"::timestamp without time zone AT TIME ZONE 'UTC'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "date_updated" TYPE timestamp with time zone USING "date_created"::timestamp without time zone AT TIME ZONE 'UTC'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "last_online" TYPE timestamp with time zone USING "date_created"::timestamp without time zone AT TIME ZONE 'UTC'`);
        await queryRunner.query(`INSERT INTO "users" ("profile_pic", "date_created", "date_updated", "last_online") VALUES ('https://example.com/profile1.jpg', NOW(), NOW(), NOW())`);
        await queryRunner.query(`INSERT INTO "users" ("profile_pic", "date_created", "date_updated", "last_online") VALUES ('https://example.com/profile2.jpg', NOW(), NOW(), NOW())`);
        await queryRunner.query(`INSERT INTO "users" ("profile_pic", "date_created", "date_updated", "last_online") VALUES ('https://example.com/profile3.jpg', NOW(), NOW(), NOW())`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "date_created" TYPE VARCHAR`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "date_updated" TYPE VARCHAR`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "last_online" TYPE VARCHAR`);
    }
}
exports.UpdateUserTimestampColumn1676744717064 = UpdateUserTimestampColumn1676744717064;
