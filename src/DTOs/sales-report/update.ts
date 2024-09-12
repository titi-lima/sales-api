import { z } from 'zod';
import { CreateSalesReportDTO } from './create';

export const UpdateSalesReportDTO = CreateSalesReportDTO.partial();

export const UpdateSalesReportWhereDTO = z.object({
  id: z.string(),
});

export type IUpdateSalesReportDTO = z.infer<typeof UpdateSalesReportDTO>;

export type IUpdateSalesReportWhereDTO = z.infer<
  typeof UpdateSalesReportWhereDTO
>;
