
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSourceConfig = void 0;
const typeorm_1 = require("typeorm");
const dotenv = require("dotenv");
dotenv.config();
exports.DataSourceConfig = {
    type: 'postgres',
    host: process.env.HOST,
    port: 5432,
    username: process.env.USERNAME,
    password: process.env.PASS,
    database: process.env.USERNAME,
    synchronize: true,
    ssl: true,
    logging: true,
    "entities": [
        "dist/entities/**/*.{ts,js}"
    ],
    "migrations": [
        "dist/migrations/**/*.{ts,js}"
    ],
};
const dataSource = new typeorm_1.DataSource(exports.DataSourceConfig);
exports.default = dataSource;