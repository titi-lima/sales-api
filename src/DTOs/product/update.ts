import { z } from 'zod';
import { CreateProductDTO } from './create';

export const UpdateProductDTO = CreateProductDTO.partial();

export const UpdateProductWhereDTO = z.object({
  id: z.string(),
});

export type IUpdateProductDTO = z.infer<typeof UpdateProductDTO>;

export type IUpdateProductWhereDTO = z.infer<typeof UpdateProductWhereDTO>;
