"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DDLMigration1682032908311 = void 0;
class DDLMigration1682032908311 {
    constructor() {
        this.name = 'DDLMigration1682032908311';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "posts_tags_tag" DROP CONSTRAINT "FK_3bb7ea9a8e96b9fe7d81749d0f0"`);
        await queryRunner.query(`ALTER TABLE "posts_tags_tag" ADD CONSTRAINT "FK_3bb7ea9a8e96b9fe7d81749d0f0" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "posts_tags_tag" DROP CONSTRAINT "FK_3bb7ea9a8e96b9fe7d81749d0f0"`);
        await queryRunner.query(`ALTER TABLE "posts_tags_tag" ADD CONSTRAINT "FK_3bb7ea9a8e96b9fe7d81749d0f0" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }
}
exports.DDLMigration1682032908311 = DDLMigration1682032908311;
