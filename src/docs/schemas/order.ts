import { generateSchema } from '@anatine/zod-openapi';
import {
  CreateOrderProductDTO,
  UpdateOrderDTO,
  UpdateOrderProductDTO,
} from '@DTOs';
import type { OpenAPIV3_1 } from 'openapi-types';

export const orderSchema: OpenAPIV3_1.SchemaObject = {
  title: 'Order',
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    status: {
      type: 'string',
      enum: ['CART', 'RECEIVED', 'PENDING', 'SHIPPED', 'DELIVERED'],
    },
    totalPrice: {
      type: 'number',
    },
    clientId: {
      type: 'string',
    },
    orderedAt: {
      type: 'string',
      format: 'date-time',
    },
    orderProducts: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          quantity: {
            type: 'number',
          },
          unitPrice: {
            type: 'number',
          },
          subtotal: {
            type: 'number',
          },
          productId: {
            type: 'string',
          },
          orderId: {
            type: 'string',
          },
        },
      },
    },
  },
};

export const createOrderProductOpenApiSchema = generateSchema(
  CreateOrderProductDTO,
);
export const updateOrderProductOpenApiSchema = generateSchema(
  UpdateOrderProductDTO,
);
export const updateOrderOpenApiSchema = generateSchema(UpdateOrderDTO);
