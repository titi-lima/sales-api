import { generateSchema } from '@anatine/zod-openapi';
import { CreateProductDTO, UpdateProductDTO } from '@DTOs';
import type { OpenAPIV3_1 } from 'openapi-types';

export const productSchema: OpenAPIV3_1.SchemaObject = {
  title: 'Product',
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    price: {
      type: 'number',
    },
    quantity: {
      type: 'number',
    },
  },
};

export const createProductOpenApiSchema = generateSchema(CreateProductDTO);
export const updateProductOpenApiSchema = generateSchema(UpdateProductDTO);
