import { MigrationInterface, QueryRunner } from "typeorm";

export class DDLMigration1682032908311 implements MigrationInterface {
    name = 'DDLMigration1682032908311'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts_tags_tag" DROP CONSTRAINT "FK_3bb7ea9a8e96b9fe7d81749d0f0"`);
        await queryRunner.query(`ALTER TABLE "posts_tags_tag" ADD CONSTRAINT "FK_3bb7ea9a8e96b9fe7d81749d0f0" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts_tags_tag" DROP CONSTRAINT "FK_3bb7ea9a8e96b9fe7d81749d0f0"`);
        await queryRunner.query(`ALTER TABLE "posts_tags_tag" ADD CONSTRAINT "FK_3bb7ea9a8e96b9fe7d81749d0f0" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
