export const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'My API',
            version: '1.0.0',
            description: 'Description of my API'
        },
        servers: [{
            url: 'http://localhost:3000',
            description: 'Development server'
        }]
    },
    apis: ['path/to/your/routes/*.ts']
};
