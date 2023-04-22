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
    database: process.env.DBNAME,
    entities: ["./src/entities/*.ts"],
    migrations: ["./src/migrations/*.ts"],
    logging: true,
    synchronize: true,
});
exports.default = myDataSource;
