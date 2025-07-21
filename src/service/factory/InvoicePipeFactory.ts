import { InvoiceContext } from "@/types/restApiType";
import { Pipe } from "../pipe/Pipe";
import { ValidateRequestPipe } from "../pipe/ValidRequestPipe";
import { CreateInvoicePipe } from "../pipe/CreateInvoicePipe";
import { CreateInvoiceItemsPipe } from "../pipe/CreateInvoiceItemsPipe";
import { DeductStockItemPipe } from "../pipe/DeductStockItemPipe";
import { CreatePdfPipe } from "../pipe/CreatePdfPipe";
import { StorePdfPipe } from "../pipe/StorePdfPipe";

export class InvoicePipelineFactory {
    static buildPipeline(): Pipe<InvoiceContext>[] {
      return [
        new ValidateRequestPipe(),
        new CreateInvoicePipe(),
        new DeductStockItemPipe(),
        new CreateInvoiceItemsPipe(),
        new CreatePdfPipe(),
        new StorePdfPipe(),
      ];
    }
  }