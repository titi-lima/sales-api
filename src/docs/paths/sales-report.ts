import type { OpenAPIV3_1 } from 'openapi-types';
import {
  createSalesReportOpenApiSchema,
  updateSalesReportOpenApiSchema,
} from '../schemas/sales-report';

export const salesReportPath: OpenAPIV3_1.Document['paths'] = {
  '/sales-reports': {
    post: {
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: 'Create a new sales report.',
      description: 'Creates a new sales report.',
      tags: ['Sales Reports'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: createSalesReportOpenApiSchema as any,
          },
        },
        description: 'Sales report data',
      },
      responses: {
        201: {
          description: 'Sales report created successfully.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/salesReportSchema',
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
      summary: 'Find all sales reports.',
      description: 'Returns all sales reports.',
      tags: ['Sales Reports'],
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
          name: 'beginDate',
          in: 'query',
          required: false,
          schema: {
            type: 'string',
            format: 'date-time',
          },
        },
        {
          name: 'endDate',
          in: 'query',
          required: false,
          schema: {
            type: 'string',
            format: 'date-time',
          },
        },
      ],
      responses: {
        200: {
          description: 'Sales reports found.',
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
                      $ref: '#/components/schemas/salesReportSchema',
                    },
                  },
                },
              },
            },
          },
        },
        204: {
          description: 'Sales reports not found.',
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
  '/sales-reports/{id}': {
    get: {
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: 'Find a sales report by id.',
      description: 'Returns a sales report by id.',
      tags: ['Sales Reports'],
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
          description: 'Sales report found.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                  },
                  data: {
                    $ref: '#/components/schemas/salesReportSchema',
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
        404: {
          description: 'Sales report not found.',
        },
      },
    },
    patch: {
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: 'Update a sales report.',
      description: 'Updates a sales report.',
      tags: ['Sales Reports'],
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
            schema: updateSalesReportOpenApiSchema as any,
          },
        },
        description: 'Sales report data',
      },
      responses: {
        200: {
          description: 'Sales report updated successfully.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                  },
                  data: {
                    $ref: '#/components/schemas/salesReportSchema',
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
        404: {
          description: 'Sales report not found.',
        },
      },
    },
    delete: {
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: 'Delete a sales report.',
      description: 'Deletes a sales report.',
      tags: ['Sales Reports'],
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
          description: 'Sales report deleted successfully.',
        },
        400: {
          description: 'Bad request.',
        },
        401: {
          description: 'Token is not present, invalid or expired.',
        },
        404: {
          description: 'Sales report not found.',
        },
      },
    },
  },
};
