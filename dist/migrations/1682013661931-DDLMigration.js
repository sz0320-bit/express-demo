"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DDLMigration1682013661931 = void 0;
class DDLMigration1682013661931 {
    constructor() {
        this.name = 'DDLMigration1682013661931';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "posts" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "date_created" TIMESTAMP NOT NULL DEFAULT now(), "date_updated" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "posts"`);
    }
}
exports.DDLMigration1682013661931 = DDLMigration1682013661931;
