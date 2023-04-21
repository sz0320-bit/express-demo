"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DDLMigration1682032179247 = void 0;
class DDLMigration1682032179247 {
    constructor() {
        this.name = 'DDLMigration1682032179247';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "tag" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "posts_tags_tag" ("postsId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "PK_06eec4750d0f528d9a659e6e0db" PRIMARY KEY ("postsId", "tagId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_98d9b575df7231009a53ffc6fa" ON "posts_tags_tag" ("postsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3bb7ea9a8e96b9fe7d81749d0f" ON "posts_tags_tag" ("tagId") `);
        await queryRunner.query(`ALTER TABLE "posts_tags_tag" ADD CONSTRAINT "FK_98d9b575df7231009a53ffc6fa7" FOREIGN KEY ("postsId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "posts_tags_tag" ADD CONSTRAINT "FK_3bb7ea9a8e96b9fe7d81749d0f0" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "posts_tags_tag" DROP CONSTRAINT "FK_3bb7ea9a8e96b9fe7d81749d0f0"`);
        await queryRunner.query(`ALTER TABLE "posts_tags_tag" DROP CONSTRAINT "FK_98d9b575df7231009a53ffc6fa7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3bb7ea9a8e96b9fe7d81749d0f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_98d9b575df7231009a53ffc6fa"`);
        await queryRunner.query(`DROP TABLE "posts_tags_tag"`);
        await queryRunner.query(`DROP TABLE "tag"`);
    }
}
exports.DDLMigration1682032179247 = DDLMigration1682032179247;
