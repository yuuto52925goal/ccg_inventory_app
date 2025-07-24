import { InvoiceContext } from "@/types/restApiType";
import { Pipe } from "./Pipe";
import * as Dao from '@/lib/repositories/invoice'

export class CreateInvoiceItemsPipe implements Pipe<InvoiceContext> {
  async execute(context: InvoiceContext): Promise<InvoiceContext> {
    console.log("Start creating invoice items")
    const dao = new Dao.InvoiceItemDAO()
    if (!context.invoiceId) throw "No Invoice id";
    await dao.postInvoiceItem(context.request.invoiceItems, context.invoiceId)
    return context;
  }
}
