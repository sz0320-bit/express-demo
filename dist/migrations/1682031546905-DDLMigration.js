"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DDLMigration1682031546905 = void 0;
class DDLMigration1682031546905 {
    constructor() {
        this.name = 'DDLMigration1682031546905';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "comments" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "date_created" TIMESTAMP NOT NULL DEFAULT now(), "date_updated" TIMESTAMP NOT NULL DEFAULT now(), "message" character varying NOT NULL, "user_id" integer, "post_id" integer, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_259bf9825d9d198608d1b46b0b5" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_259bf9825d9d198608d1b46b0b5"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d"`);
        await queryRunner.query(`DROP TABLE "comments"`);
    }
}
exports.DDLMigration1682031546905 = DDLMigration1682031546905;
