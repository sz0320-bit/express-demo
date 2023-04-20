import { MigrationInterface, QueryRunner } from "typeorm";

export class DDLMigration1682013661931 implements MigrationInterface {
    name = 'DDLMigration1682013661931'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "posts" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "date_created" TIMESTAMP NOT NULL DEFAULT now(), "date_updated" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "posts"`);
    }

}
