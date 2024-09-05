export default {
  openapi: '3.0.0',
  info: {
    title: 'Sales API',
    description: 'API para o desenvolvimento de uma aplicação de vendas',
    version: '0.0.1',
  },
  servers: [
    {
      url: 'http://localhost:3001',
      description: 'Local Server',
    },
  ],
  paths: {
    // paths go here!
  },
  components: {
    schemas: {
      // and schemas go here!
    },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    security: {
      bearerAuth: [],
    },
  },
};
