// lib/pipeline/CreateInvoicePipe.ts
import { InvoiceContext } from "@/types/restApiType";
import { Pipe } from "./Pipe";
import * as Dao from '@/lib/repositories/invoice'
// import InvoiceDAO from "@/lib/repositories/invoice/InvoiceDAO";

export class CreateInvoicePipe implements Pipe<InvoiceContext> {
  async execute(context: InvoiceContext): Promise<InvoiceContext> {
    const dao = new Dao.InvoiceDAO();
    const invoice = await dao.postInvoice(context.request.invoice);
    return { request: {...context.request, invoice: invoice}, invoiceId: invoice.invoice_id };
  }
}