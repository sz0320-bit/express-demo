import { MigrationInterface, QueryRunner } from "typeorm"
import {User} from "../entities/user";

export class CreateUserTable1676734590592 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
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

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
