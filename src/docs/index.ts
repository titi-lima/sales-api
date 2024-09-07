import type { OpenAPIV3_1 } from 'openapi-types';
import { userSchema } from './schemas/user';
import { userPath } from './paths/users';

export default {
  openapi: '3.1.0',
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
    ...userPath,
  },
  components: {
    schemas: {
      userSchema,
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
} as OpenAPIV3_1.Document;
