import type { OpenAPIV3_1 } from 'openapi-types';
import { createUserOpenApiSchema } from '../schemas/user';

console.log(createUserOpenApiSchema);

export const userPath: OpenAPIV3_1.Document['paths'] = {
  '/users/create': {
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
        409: {
          description: 'Email already exists.',
        },
      },
    },
  },
};
