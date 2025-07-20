import InvoiceDAO from "@/lib/repositories/invoice/InvoiceDAO";
import InvoiceItemDAO from "@/lib/repositories/invoice/InvoiceItemDAO";
import {RequestInvoiceType} from "@/types/restApiType"

export default class InvoiceService {

  public static async ResolveInvoice(
    invoiceDAO: InvoiceDAO,
    invoiceItemDAO: InvoiceItemDAO,
    invoiceRequest: RequestInvoiceType,
  ) {
    console.log(invoiceRequest)
    invoiceDAO.postInvoice();
    invoiceItemDAO.postInvoiceItem()
  }
}