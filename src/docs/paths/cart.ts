import type { OpenAPIV3_1 } from 'openapi-types';
import {
  createOrderProductOpenApiSchema,
  updateOrderProductOpenApiSchema,
} from '../schemas/order';

export const cartPath: OpenAPIV3_1.Document['paths'] = {
  '/carts': {
    post: {
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: 'Create a new cart.',
      description: 'Creates a new cart.',
      tags: ['Carts'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: createOrderProductOpenApiSchema as any,
          },
        },
        description: 'Cart data',
      },
      responses: {
        201: {
          description: 'Product added to cart.',
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
      },
    },
    get: {
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: "Find user's cart.",
      description: "Returns the user's cart.",
      tags: ['Carts'],
      parameters: [
        {
          name: 'productId',
          in: 'query',
          required: false,
          schema: {
            type: 'string',
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
          description: 'Carts found.',
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
          description: 'Carts not found.',
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
  '/carts/{orderProductId}': {
    patch: {
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: 'Update a cart item.',
      description: 'Updates a cart item.',
      tags: ['Carts'],
      parameters: [
        {
          name: 'orderProductId',
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
            schema: updateOrderProductOpenApiSchema as any,
          },
        },
        description: 'Cart data',
      },

      responses: {
        200: {
          description: 'Cart updated.',
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
      },
    },
    delete: {
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: 'Delete a cart item.',
      description: 'Deletes a cart item.',
      tags: ['Carts'],
      parameters: [
        {
          name: 'orderProductId',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'Product removed from cart.',
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
};
