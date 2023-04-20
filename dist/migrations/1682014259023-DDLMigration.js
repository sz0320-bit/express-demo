"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DDLMigration1682014259023 = void 0;
class DDLMigration1682014259023 {
    constructor() {
        this.name = 'DDLMigration1682014259023';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "posts" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_ae05faaa55c866130abef6e1fee" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_ae05faaa55c866130abef6e1fee"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "userId"`);
    }
}
exports.DDLMigration1682014259023 = DDLMigration1682014259023;
