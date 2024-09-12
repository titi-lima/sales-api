import { z } from 'zod';

export const FindByIdSalesReportWhereDTO = z.object({
  id: z.string({ required_error: 'Id is required' }),
});

export type IFindByIdSalesReportWhereDTO = z.infer<
  typeof FindByIdSalesReportWhereDTO
>;
