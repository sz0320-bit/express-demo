import { MigrationInterface, QueryRunner } from "typeorm"

export class DDLMigration1676839091298 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
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

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE auth_users`);
    }

}
