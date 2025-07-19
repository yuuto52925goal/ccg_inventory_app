import InvoiceDAO from "@/lib/repositories/invoice/InvoiceDAO";
import InvoiceItemDAO from "@/lib/repositories/invoice/InvoiceItemDAO";
import { InvoiceItemType, InvoiceType } from "@/types/supabsePublicType";

export default class InvoiceService {

  public static async ResolveInvoice(
    invoiceDAO: InvoiceDAO,
    invoiceItemDAO: InvoiceItemDAO,
    invoice: InvoiceType, 
    invoiceItems: InvoiceItemType[]
  ) {
    console.log(invoice)
    console.log(invoiceItems)
    invoiceDAO.postInvoice();
    invoiceItemDAO.postInvoiceItem()
  }
}