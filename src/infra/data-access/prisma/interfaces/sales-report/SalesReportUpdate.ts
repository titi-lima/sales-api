import type { Prisma, SalesReport } from '@prisma/client';

export namespace ISalesReportUpdate {
  export type Input = Prisma.SalesReportUpdateInput;
  export type Where = Prisma.SalesReportWhereUniqueInput;
  export type Output = SalesReport;
}
