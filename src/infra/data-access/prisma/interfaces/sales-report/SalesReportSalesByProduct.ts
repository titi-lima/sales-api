import { salesByProduct } from '@prisma/client/sql';

export namespace ISalesReportSalesByProduct {
  export type Input = { beginDate: Date; endDate: Date };
  export type Output = salesByProduct.Result[];
}
