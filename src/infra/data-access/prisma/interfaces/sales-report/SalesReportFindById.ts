import type { Prisma, SalesReport } from '@prisma/client';

export namespace ISalesReportFindById {
  export type Input = Prisma.SalesReportWhereUniqueInput['id'];
  export type Output = SalesReport;
}
