import { MigrationInterface, QueryRunner } from "typeorm"

export class AddUsers1676752655985 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO "users" ("profile_pic", "date_created", "date_updated", "last_online") VALUES ('https://example.com/profile1.jpg', NOW(), NOW(), NOW())`);
        await queryRunner.query(`INSERT INTO "users" ("profile_pic", "date_created", "date_updated", "last_online") VALUES ('https://example.com/profile2.jpg', NOW(), NOW(), NOW())`);
        await queryRunner.query(`INSERT INTO "users" ("profile_pic", "date_created", "date_updated", "last_online") VALUES ('https://example.com/profile3.jpg', NOW(), NOW(), NOW())`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
