import {DataSource} from "typeorm";
require('dotenv')


const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.HOST,
    port: 5432,
    username: process.env.USERNAME,
    password: process.env.PASS,
    database: process.env.DBNAME,
    synchronize: true,
    ssl: true,
    logging: true,
    "entities": [
        "src/entities/**/*.{ts,js}"
    ],
    "migrations": [
        "src/migrations/**/*.{ts,js}"
    ],
});

export default AppDataSource;