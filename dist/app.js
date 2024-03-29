"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_autogen_1 = __importDefault(require("swagger-autogen"));
const path_1 = __importDefault(require("path"));
const app_data_source_1 = __importDefault(require("./app-data-source"));
const routes_1 = __importDefault(require("./routes"));
app_data_source_1.default.initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
})
    .catch((err) => {
    console.error("Error during Data Source initialization:", err);
});
require('dotenv').config({ path: './.env' });
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
const cors = require('cors');
const corsOptions = {
    origin: true
};
app.use(cors(corsOptions));
// Generate swagger documentation
const swaggerFile = path_1.default.join(__dirname, 'swagger-output.json');
const fs = require('fs');
const routesFolder = './src/routes';
const endpoints = fs.readdirSync(routesFolder)
    .filter(file => path_1.default.extname(file) === '.ts')
    .map(file => path_1.default.join(routesFolder, file));
(0, swagger_autogen_1.default)()(swaggerFile, endpoints);
app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(require(swaggerFile)));
// Mount the routes exported from index.ts
app.use(routes_1.default);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
