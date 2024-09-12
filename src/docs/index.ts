import type { OpenAPIV3_1 } from 'openapi-types';
import { sessionPath } from 'src/docs/paths/sessions';
import { userSchema } from './schemas/user';
import { userPath } from './paths/users';
import { productSchema } from './schemas/product';
import { productPath } from './paths/products';
import { orderSchema } from './schemas/order';
import { orderPath } from './paths/order';
import { cartPath } from './paths/cart';
import { salesReportPath } from './paths/sales-report';
import { salesReportSchema } from './schemas/sales-report';

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
    ...sessionPath,
    ...userPath,
    ...productPath,
    ...orderPath,
    ...cartPath,
    ...salesReportPath,
  },
  components: {
    schemas: {
      userSchema,
      productSchema,
      orderSchema,
      salesReportSchema,
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
