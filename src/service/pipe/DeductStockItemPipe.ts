import { InvoiceContext } from "@/types/restApiType";
import { Pipe } from "./Pipe";
import { deductItemStock } from "@/lib/repositories/itemStock/editData";

export class DeductStockItemPipe implements Pipe<InvoiceContext> {
  async execute(context: InvoiceContext): Promise<InvoiceContext> {
    await deductItemStock(context.request.invoiceItems)
    return context;
  }
}
