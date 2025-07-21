import { InvoiceContext } from "@/types/restApiType";
import { Pipe } from "./Pipe";

export class ValidateRequestPipe implements Pipe<InvoiceContext> {
  async execute(context: InvoiceContext): Promise<InvoiceContext> {
    const { invoice, invoiceItems } = context.request;
    if (!invoice || !invoiceItems.length) {
      throw new Error("Invalid request: invoice or items missing.");
    }
    return context;
  }
}