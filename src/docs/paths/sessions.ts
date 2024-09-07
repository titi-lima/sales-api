import type { OpenAPIV3_1 } from 'openapi-types';
import { sessionOpenApiSchema } from '../schemas/session';

export const sessionPath: OpenAPIV3_1.Document['paths'] = {
  '/sessions': {
    post: {
      summary: 'Sign in.',
      description: 'Authenticates a user and returns an access token.',
      tags: ['Sessions'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: sessionOpenApiSchema as any,
          },
        },
        description: 'Credentials',
      },
      responses: {
        200: {
          description: 'Login successful.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: {
                    type: 'string',
                  },
                  message: {
                    type: 'string',
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
          description: 'Invalid credentials.',
        },
      },
    },
  },
};
