import {InvoiceContext, RequestInvoiceType} from "@/types/restApiType"
import { InvoicePipelineFactory } from "../factory/InvoicePipeFactory";

export default class InvoiceService {
  
  public static async ResolveInvoice(
    invoiceRequest: RequestInvoiceType,
  ) {
    const context: InvoiceContext = { request: invoiceRequest };
    const pipes = InvoicePipelineFactory.buildPipeline();
    let current = context;
    for (const pipe of pipes) {
      current = await pipe.execute(current);
    }
    return current;
  }
}