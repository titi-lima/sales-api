import type { OpenAPIV3_1 } from 'openapi-types';
import { updateOrderOpenApiSchema } from '../schemas/order';

export const orderPath: OpenAPIV3_1.Document['paths'] = {
  '/orders': {
    get: {
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: 'Find all orders.',
      description: 'Returns all orders.',
      tags: ['Orders'],
      parameters: [
        {
          name: 'clientId',
          in: 'query',
          required: false,
          schema: {
            type: 'string',
          },
        },
        {
          name: 'orderedAtBegin',
          in: 'query',
          required: false,
          schema: {
            type: 'string',
            format: 'date-time',
          },
        },
        {
          name: 'orderedAtEnd',
          in: 'query',
          required: false,
          schema: {
            type: 'string',
            format: 'date-time',
          },
        },
        {
          name: 'status',
          in: 'query',
          required: false,
          schema: {
            type: 'string',
            enum: ['CART', 'RECEIVED', 'PENDING', 'SHIPPED', 'DELIVERED'],
          },
        },
        {
          name: 'limit',
          in: 'query',
          required: false,
          schema: {
            type: 'number',
          },
        },
        {
          name: 'offset',
          in: 'query',
          required: false,
          schema: {
            type: 'number',
          },
        },
      ],
      responses: {
        200: {
          description: 'Orders found.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                  },
                  data: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/orderSchema',
                    },
                  },
                },
              },
            },
          },
        },
        204: {
          description: 'Orders not found.',
        },
        400: {
          description: 'Bad request.',
        },
        401: {
          description: 'Token is not present, invalid or expired.',
        },
      },
    },
  },
  '/orders/{id}': {
    patch: {
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: 'Update an order.',
      description: 'Updates an order.',
      tags: ['Orders'],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: updateOrderOpenApiSchema as any,
          },
        },
      },

      responses: {
        200: {
          description: 'Order updated successfully.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                  },
                  data: {
                    $ref: '#/components/schemas/orderSchema',
                  },
                },
              },
            },
          },
        },
        400: {
          description: 'Bad request.',
        },
        401: {
          description: 'Token is not present, invalid or expired.',
        },
        403: {
          description: "You can not access another user's data.",
        },
        404: {
          description: 'Order not found.',
        },
      },
    },
    delete: {
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: 'Delete an order.',
      description: 'Deletes an order.',
      tags: ['Orders'],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'Order deleted successfully.',
        },
        400: {
          description: 'Bad request.',
        },
        401: {
          description: 'Token is not present, invalid or expired.',
        },
        403: {
          description: "You can not access another user's data.",
        },
        404: {
          description: 'Order not found.',
        },
      },
    },
  },
};
