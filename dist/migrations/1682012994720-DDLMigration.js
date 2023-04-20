"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DDLMigration1682012994720 = void 0;
class DDLMigration1682012994720 {
    constructor() {
        this.name = 'DDLMigration1682012994720';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "auth_users" DROP CONSTRAINT "FK_bae2099f071330ea666f2a62af4"`);
        await queryRunner.query(`ALTER TABLE "auth_users" ADD CONSTRAINT "FK_bae2099f071330ea666f2a62af4" FOREIGN KEY ("profile_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "auth_users" DROP CONSTRAINT "FK_bae2099f071330ea666f2a62af4"`);
        await queryRunner.query(`ALTER TABLE "auth_users" ADD CONSTRAINT "FK_bae2099f071330ea666f2a62af4" FOREIGN KEY ("profile_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
exports.DDLMigration1682012994720 = DDLMigration1682012994720;
