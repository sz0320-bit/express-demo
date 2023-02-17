import express, { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
const swaggerFile = require('../swagger-output.json');

import * as users from './routes/user';

const app: Application = express();
const port: number = 3000;

app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use('/user', users.default);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
