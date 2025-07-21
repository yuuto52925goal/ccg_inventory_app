import { InvoiceContext } from "@/types/restApiType";
import { Pipe } from "../pipe/Pipe";
import { ValidateRequestPipe } from "../pipe/ValidRequestPipe";
import { CreateInvoicePipe } from "../pipe/CreateInvoicePipe";

export class InvoicePipelineFactory {
    static buildPipeline(): Pipe<InvoiceContext>[] {
      return [
        new ValidateRequestPipe(),
        new CreateInvoicePipe(),
        // new DeductStockPipe(),
        // new CreateInvoiceItemPipe(),
        // new GeneratePDFPipe(),
      ];
    }
  }