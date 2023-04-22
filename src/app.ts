import express, {Application} from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerAutogen from 'swagger-autogen';
import path from 'path';
import myDataSource from "../app-data-source";
import routes from './routes';

myDataSource.initialize()
    .then(() => {
    console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })



const app: Application = express();
const port: number = 3000;
app.use(express.json());

// Generate swagger documentation
const swaggerFile = path.join(__dirname, 'swagger-output.json');
const fs = require('fs');
const routesFolder = './src/routes';

const endpoints = fs.readdirSync(routesFolder)
    .filter(file => path.extname(file) === '.ts')
    .map(file => path.join(routesFolder, file));

swaggerAutogen()(swaggerFile, endpoints);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(require(swaggerFile)));

// Mount the routes exported from index.ts
app.use(routes);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
