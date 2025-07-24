import { InvoiceContext } from "@/types/restApiType";
import { Pipe } from "./Pipe";
import { createFileName } from "@/lib/utils/fielUtil";
import { getPublicURL, uploadBuffer } from "@/lib/repositories/storage";
import { InvoiceDAO } from "@/lib/repositories/invoice";

export class StorePdfPipe implements Pipe<InvoiceContext> {
  async execute(context: InvoiceContext): Promise<InvoiceContext> {
    console.log("store pdf pipe start")
    if (!context.invoiceId || !context.pdf) throw "No pdf or invoice id provided"
    const fileName = createFileName(context.invoiceId)
    await uploadBuffer(fileName, context.pdf)
    const publicUrl = await getPublicURL(fileName)
    if (!context.invoiceId) throw "invoice id is not provided"
    await InvoiceDAO.updateUrlInvoice(context.invoiceId, publicUrl)
    return context;
  }
}
