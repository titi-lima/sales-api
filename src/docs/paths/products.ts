import type { OpenAPIV3_1 } from 'openapi-types';
import {
  createProductOpenApiSchema,
  updateProductOpenApiSchema,
} from '../schemas/product';

export const productPath: OpenAPIV3_1.Document['paths'] = {
  '/products': {
    post: {
      summary: 'Create a new product.',
      description: 'Creates a new product.',
      tags: ['Products'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: createProductOpenApiSchema as any,
          },
        },
        description: 'Product data',
      },
      responses: {
        201: {
          description: 'Product created successfully.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/productSchema',
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
          description: 'Forbidden.',
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    get: {
      summary: 'Find all products.',
      description: 'Returns all products.',
      tags: ['Products'],
      parameters: [
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
        {
          name: 'name',
          in: 'query',
          required: false,
          schema: {
            type: 'string',
          },
        },
        {
          name: 'description',
          in: 'query',
          required: false,
          schema: {
            type: 'string',
          },
        },
        {
          name: 'available',
          in: 'query',
          required: false,
          schema: {
            type: 'boolean',
          },
        },
        {
          name: 'priceOrderBy',
          in: 'query',
          required: false,
          schema: {
            type: 'string',
            enum: ['asc', 'desc'],
          },
        },
      ],
      responses: {
        200: {
          description: 'Products found.',
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
                      $ref: '#/components/schemas/productSchema',
                    },
                  },
                },
              },
            },
          },
        },
        204: {
          description: 'Products not found.',
        },
        400: {
          description: 'Bad request.',
        },
      },
    },
  },
  '/products/{id}': {
    get: {
      summary: 'Find a product by id.',
      description: 'Returns a product by id.',
      tags: ['Products'],
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
          description: 'Product found.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                  },
                  data: {
                    $ref: '#/components/schemas/productSchema',
                  },
                },
              },
            },
          },
        },
        400: {
          description: 'Bad request.',
        },
        404: {
          description: 'Product not found.',
        },
      },
    },
    patch: {
      summary: 'Update a product.',
      description: 'Updates a product.',
      tags: ['Products'],
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
            schema: updateProductOpenApiSchema as any,
          },
        },
        description: 'Product data',
      },
      responses: {
        200: {
          description: 'Product updated successfully.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                  },
                  data: {
                    $ref: '#/components/schemas/productSchema',
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
          description: 'Forbidden.',
        },
        404: {
          description: 'Product not found.',
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    delete: {
      summary: 'Delete a product.',
      description: 'Deletes a product.',
      tags: ['Products'],
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
          description: 'Product deleted successfully.',
        },
        400: {
          description: 'Bad request.',
        },
        401: {
          description: 'Token is not present, invalid or expired.',
        },
        403: {
          description: 'Forbidden.',
        },
        404: {
          description: 'Product not found.',
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
  },
};
