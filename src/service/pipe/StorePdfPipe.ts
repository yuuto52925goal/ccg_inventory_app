import { InvoiceContext } from "@/types/restApiType";
import { Pipe } from "./Pipe";

export class StorePdfPipe implements Pipe<InvoiceContext> {
  async execute(context: InvoiceContext): Promise<InvoiceContext> {
    // TODO: Implement PDF storage logic
    return context;
  }
}
