import { z } from 'zod';

export const DeleteSalesReportWhereDTO = z.object({
  id: z.string({ required_error: 'Id is required' }),
});

export type IDeleteSalesReportWhereDTO = z.infer<
  typeof DeleteSalesReportWhereDTO
>;
