import type { Prisma, SalesReport } from '@prisma/client';

export namespace ISalesReportFindAll {
  export type Input = Prisma.SalesReportWhereInput;
  export type Output = SalesReport;
  export type Options = {
    limit?: number;
    offset?: number;
  };
}
