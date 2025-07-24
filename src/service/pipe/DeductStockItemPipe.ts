import { InvoiceContext } from "@/types/restApiType";
import { Pipe } from "./Pipe";
import { deductItemStock } from "@/lib/repositories/itemStock/editData";
import { InvoiceDAO } from "@/lib/repositories/invoice";

export class DeductStockItemPipe implements Pipe<InvoiceContext> {
  async execute(context: InvoiceContext): Promise<InvoiceContext> {
    const deductData = await deductItemStock(context.request.invoiceItems)
    if (!context.invoiceId) throw new Error("Error no invoice id")
    InvoiceDAO.updateStockIdInvoice(context.invoiceId, deductData)
    return context;
  }
}
