import { z } from 'zod';

export const CreateSalesReportDTO = z.object({
  beginDate: z.coerce.date({ required_error: 'Begin date is required' }),
  endDate: z.coerce.date().default(new Date()),
});

export type ICreateSalesReportDTO = z.infer<typeof CreateSalesReportDTO>;
