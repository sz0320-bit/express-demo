import express, { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerAutogen from 'swagger-autogen';
import path from 'path';

import routes from './routes';

const app: Application = express();
const port: number = 3000;

app.use(express.json());

// Generate swagger documentation
const swaggerFile = path.join(__dirname, 'swagger-output.json');
const endpoints = ['./src/routes/user.ts'];
swaggerAutogen()(swaggerFile, endpoints);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(require(swaggerFile)));

// Mount the routes exported from index.ts
app.use(routes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
