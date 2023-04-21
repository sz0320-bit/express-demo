"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
require('dotenv');
const myDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.HOST,
    port: 5432,
    username: process.env.USERNAME,
    password: process.env.PASS,
    database: process.env.USERNAME,
    entities: ["./dist/entities/*.js"],
    migrations: ["./dist/migrations/*.js"],
    logging: true,
    synchronize: false,
});
exports.default = myDataSource;
