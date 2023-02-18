import {DataSource} from "typeorm";
require('dotenv')


const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.HOST,
    port: 5432,
    username: process.env.USERNAME,
    password: process.env.PASS,
    database: process.env.USERNAME,
    synchronize: false,
    logging: true,
    "entities": [
        "src/entities/**/*.ts"
    ],
    "migrations": [
        "src/migrations/**/*.ts"
    ],
});

export default AppDataSource;