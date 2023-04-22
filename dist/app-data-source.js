"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
require('dotenv').config({ path: './.env' });
console.log('Current working directory:', process.cwd());
console.log('Environment variables:', process.env);
console.log({
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
const myDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.HOST,
    username: process.env.USERNAME,
    ssl: true,
    password: process.env.PASS,
    port: 5432,
    database: process.env.DBNAME,
    entities: ["./dist/entities/*.js"],
    migrations: ["./dist/migrations/*.js"],
    logging: true,
    synchronize: true,
});
exports.default = myDataSource;
