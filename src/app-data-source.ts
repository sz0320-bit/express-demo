import { DataSource } from "typeorm"
require('dotenv')

 const myDataSource = new DataSource({
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
})

export default myDataSource

