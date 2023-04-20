"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserTable1676734590592 = void 0;
class CreateUserTable1676734590592 {
    async up(queryRunner) {
        await queryRunner.query(`
          CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      profile_pic VARCHAR(255),
      date_created VARCHAR(255),
      date_updated VARCHAR(255),
      last_online VARCHAR(255)
    )
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
exports.CreateUserTable1676734590592 = CreateUserTable1676734590592;
