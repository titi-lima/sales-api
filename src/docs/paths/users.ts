import type { OpenAPIV3_1 } from 'openapi-types';
import {
  createUserOpenApiSchema,
  updateUserOpenApiSchema,
} from '../schemas/user';

export const userPath: OpenAPIV3_1.Document['paths'] = {
  '/users': {
    post: {
      summary: 'Create a new user.',
      description: 'Creates a new user.',
      tags: ['Users'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: createUserOpenApiSchema as any,
          },
        },
        description: 'User data',
      },
      responses: {
        201: {
          description: 'User created successfully.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/userSchema',
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
        409: {
          description: 'Email already exists.',
        },
      },
    },
    get: {
      summary: 'Find all users.',
      description: 'Returns all users.',
      tags: ['Users'],
      security: [
        {
          bearerAuth: [],
        },
      ],
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
          name: 'email',
          in: 'query',
          required: false,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'Users found.',
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
                      $ref: '#/components/schemas/userSchema',
                    },
                  },
                },
              },
            },
          },
        },
        401: {
          description: 'Token is not present, invalid or expired.',
        },
        403: {
          description: 'Forbidden.',
        },
      },
    },
  },
  '/users/{id}': {
    get: {
      summary: 'Find a user by id.',
      description: 'Returns a user by id.',
      tags: ['Users'],
      security: [
        {
          bearerAuth: [],
        },
      ],
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
          description: 'User found.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                  },
                  data: {
                    $ref: '#/components/schemas/userSchema',
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
          description: 'User not found.',
        },
      },
    },
    patch: {
      summary: 'Update a user.',
      description: 'Updates a user.',
      tags: ['Users'],
      security: [
        {
          bearerAuth: [],
        },
      ],
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
            schema: updateUserOpenApiSchema as any,
          },
        },
        description: 'User data',
      },
      responses: {
        200: {
          description: 'User updated successfully.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                  },
                  data: {
                    $ref: '#/components/schemas/userSchema',
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
          description: 'User not found.',
        },
      },
    },
    delete: {
      summary: 'Delete a user.',
      description: 'Deletes a user.',
      tags: ['Users'],
      security: [
        {
          bearerAuth: [],
        },
      ],
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
          description: 'User deleted successfully.',
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
          description: 'User not found.',
        },
      },
    },
  },
};
