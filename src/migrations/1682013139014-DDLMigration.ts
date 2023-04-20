import { MigrationInterface, QueryRunner } from "typeorm";

export class DDLMigration1682013139014 implements MigrationInterface {
    name = 'DDLMigration1682013139014'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth_users" DROP CONSTRAINT "FK_bae2099f071330ea666f2a62af4"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "last_online" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "auth_users" ADD CONSTRAINT "FK_bae2099f071330ea666f2a62af4" FOREIGN KEY ("profile_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth_users" DROP CONSTRAINT "FK_bae2099f071330ea666f2a62af4"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "last_online" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "auth_users" ADD CONSTRAINT "FK_bae2099f071330ea666f2a62af4" FOREIGN KEY ("profile_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
