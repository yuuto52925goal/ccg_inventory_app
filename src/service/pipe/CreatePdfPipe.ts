import { InvoiceContext } from "@/types/restApiType";
import { Pipe } from "./Pipe";

export class CreatePdfPipe implements Pipe<InvoiceContext> {
  async execute(context: InvoiceContext): Promise<InvoiceContext> {
    // TODO: Implement PDF creation logic
    return context;
  }
}
