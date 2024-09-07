import { generateSchema } from '@anatine/zod-openapi';
import { LoginDTO } from '@DTOs';

export const sessionOpenApiSchema = generateSchema(LoginDTO);
