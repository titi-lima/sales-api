import { generateSchema } from '@anatine/zod-openapi';
import { CreateSalesReportDTO, UpdateSalesReportDTO } from '@DTOs';
import type { OpenAPIV3_1 } from 'openapi-types';

export const salesReportSchema: OpenAPIV3_1.SchemaObject = {
  title: 'Sales Report',
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    beginDate: {
      type: 'string',
      format: 'date-time',
    },
    endDate: {
      type: 'string',
      format: 'date-time',
    },
    totalPrice: {
      type: 'number',
    },
    productsQuantity: {
      type: 'number',
    },
  },
};

export const createSalesReportOpenApiSchema =
  generateSchema(CreateSalesReportDTO);
export const updateSalesReportOpenApiSchema =
  generateSchema(UpdateSalesReportDTO);
