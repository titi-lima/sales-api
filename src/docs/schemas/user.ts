import { generateSchema } from '@anatine/zod-openapi';
import { CreateUserDTO, UpdateUserDTO } from '@DTOs';
import type { OpenAPIV3_1 } from 'openapi-types';

export const userSchema: OpenAPIV3_1.SchemaObject = {
  title: 'User',
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    type: {
      type: 'string',
      enum: ['ADMIN', 'CLIENT'],
    },
    Client: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        contact: {
          type: 'string',
        },
        address: {
          type: 'string',
        },
        status: {
          type: 'string',
          enum: ['ACTIVE', 'INACTIVE'],
        },
      },
    },
  },
};

export const createUserOpenApiSchema = generateSchema(CreateUserDTO);
export const updateUserOpenApiSchema = generateSchema(UpdateUserDTO);
