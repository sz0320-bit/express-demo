import {DataSource} from "typeorm";
require('dotenv')


const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.HOST,
    username: process.env.USERNAME,
    password: process.env.PASS,
    port: 5432,
    database: process.env.DBNAME,
    synchronize: true,
    ssl: true,
    logging: true,
    "entities": [
        "dist/entities/**/*.{ts,js}"
    ],
    "migrations": [
        "dist/migrations/**/*.{ts,js}"
    ],
});

export default AppDataSource;