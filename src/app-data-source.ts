import { DataSource } from "typeorm"
require('dotenv')

 const myDataSource = new DataSource({
    type: 'postgres',
    host: process.env.HOST,
    username: process.env.USERNAME,
    password: process.env.PASS,
    port: 5432,
    ssl: true,
    database: process.env.DBNAME,
    entities: ["./dist/entities/*.{ts,js}"],
    migrations: ["./dist/migrations/*.{ts,js}"],
    logging: true,
    synchronize: true,
})

export default myDataSource

