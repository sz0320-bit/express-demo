import { DataSource } from "typeorm"
require('dotenv')

 const myDataSource = new DataSource({
    type: 'postgres',
    host: process.env.HOST,
    port: 5432,
    username: process.env.USERNAME,
    password: process.env.PASS,
    ssl: true,
    database: process.env.DBNAME,
    entities: ["./dist/entities/*.js"],
    migrations: ["./dist/migrations/*.js"],
    logging: true,
    synchronize: true,
})

export default myDataSource

