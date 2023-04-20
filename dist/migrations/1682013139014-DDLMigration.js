"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DDLMigration1682013139014 = void 0;
class DDLMigration1682013139014 {
    constructor() {
        this.name = 'DDLMigration1682013139014';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "auth_users" DROP CONSTRAINT "FK_bae2099f071330ea666f2a62af4"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "last_online" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "auth_users" ADD CONSTRAINT "FK_bae2099f071330ea666f2a62af4" FOREIGN KEY ("profile_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "auth_users" DROP CONSTRAINT "FK_bae2099f071330ea666f2a62af4"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "last_online" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "auth_users" ADD CONSTRAINT "FK_bae2099f071330ea666f2a62af4" FOREIGN KEY ("profile_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
exports.DDLMigration1682013139014 = DDLMigration1682013139014;
