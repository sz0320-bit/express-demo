import { MigrationInterface, QueryRunner } from "typeorm"

export class UpdateUserTimestampColumn1676744717064 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "date_created" TYPE timestamp with time zone USING "date_created"::timestamp without time zone AT TIME ZONE 'UTC'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "date_updated" TYPE timestamp with time zone USING "date_created"::timestamp without time zone AT TIME ZONE 'UTC'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "last_online" TYPE timestamp with time zone USING "date_created"::timestamp without time zone AT TIME ZONE 'UTC'`);
        await queryRunner.query(`INSERT INTO "users" ("profile_pic", "date_created", "date_updated", "last_online") VALUES ('https://example.com/profile1.jpg', NOW(), NOW(), NOW())`);
        await queryRunner.query(`INSERT INTO "users" ("profile_pic", "date_created", "date_updated", "last_online") VALUES ('https://example.com/profile2.jpg', NOW(), NOW(), NOW())`);
        await queryRunner.query(`INSERT INTO "users" ("profile_pic", "date_created", "date_updated", "last_online") VALUES ('https://example.com/profile3.jpg', NOW(), NOW(), NOW())`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "date_created" TYPE VARCHAR`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "date_updated" TYPE VARCHAR`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "last_online" TYPE VARCHAR`);
    }

}
