"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
require('dotenv');
const myDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.HOST,
    username: process.env.USERNAME,
    password: process.env.PASS,
    port: 5432,
    ssl: false,
    database: process.env.DBNAME,
    entities: ["./dist/entities/*.{ts,js}"],
    migrations: ["./dist/migrations/*.{ts,js}"],
    logging: true,
    synchronize: true,
});
exports.default = myDataSource;
