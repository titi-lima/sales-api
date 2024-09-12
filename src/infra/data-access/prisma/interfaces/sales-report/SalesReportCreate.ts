import type { Prisma, SalesReport } from '@prisma/client';

export namespace ISalesReportCreate {
  export type Input = Prisma.SalesReportCreateInput;
  export type Output = SalesReport;
}
