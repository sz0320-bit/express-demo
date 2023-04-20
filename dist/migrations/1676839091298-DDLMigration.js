"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DDLMigration1676839091298 = void 0;
class DDLMigration1676839091298 {
    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE auth_users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(30) NOT NULL UNIQUE,
                email VARCHAR(254) NOT NULL UNIQUE,
                password VARCHAR(128) NOT NULL,
                profile_id INTEGER NOT NULL REFERENCES users(id)
            )
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE auth_users`);
    }
}
exports.DDLMigration1676839091298 = DDLMigration1676839091298;
