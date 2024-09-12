import { z } from 'zod';

export const FindAllSalesReportWhereDTO = z.object({
  beginDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  totalPriceGreaterThan: z.coerce.number().optional(),
  totalPriceLessThan: z.coerce.number().optional(),
  productsQuantityGreaterThan: z.coerce.number().optional(),
  productsQuantityLessThan: z.coerce.number().optional(),
  limit: z.coerce
    .number({ invalid_type_error: 'Limit must be a number' })
    .optional(),
  offset: z.coerce
    .number({ invalid_type_error: 'Offset must be a number' })
    .optional(),
});

export type IFindAllSalesReportWhereDTO = z.infer<
  typeof FindAllSalesReportWhereDTO
>;
