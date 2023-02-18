import { DataSource } from "typeorm"
require('dotenv')

 const myDataSource = new DataSource({
    type: 'postgres',
    host: process.env.HOST,
    port: 5432,
    username: process.env.USERNAME,
    password: process.env.PASS,
    database: process.env.USERNAME,
    entities: ["./src/entities/*.ts"],
    migrations: ["./src/migrations/*.ts"],
    logging: true,
    synchronize: true,
})

export default myDataSource

