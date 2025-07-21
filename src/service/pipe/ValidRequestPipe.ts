import { InvoiceContext } from "@/types/restApiType";
import { Pipe } from "./Pipe";
import * as itemStock from '@/lib/repositories/itemStock'
import { InvoiceItemType } from "@/types/supabsePublicType";

export class ValidateRequestPipe implements Pipe<InvoiceContext> {
  async execute(context: InvoiceContext): Promise<InvoiceContext> {
    const { invoice, invoiceItems } = context.request;
    if (!invoice || !invoiceItems.length) {
      throw new Error("Invalid request: invoice or items missing.");
    }

    const collectedInvoiceItems = this.collectInvoiceItems(invoiceItems)
    const validateByStock = await this.validateStockItem(collectedInvoiceItems)
    if (!validateByStock) throw new Error("Insufficient stock for one or more items.");
    return {request: {invoice, invoiceItems: collectedInvoiceItems}};
  }

  private collectInvoiceItems(invoiceItems: InvoiceItemType[]): InvoiceItemType[]{
    const mergedMap = new Map<number, InvoiceItemType>();
    for (const item of invoiceItems){
      const existing = mergedMap.get(item.item_id);
      if (existing) {
        existing.qty += item.qty; 
        existing.line_part = existing.qty * existing.sell_price
      } else {
        mergedMap.set(item.item_id, { ...item }); 
      }
    }
    return Array.from(mergedMap.values())
  }

  private async validateStockItem(invoiceItems: InvoiceItemType[]){
    const itemStocks = await itemStock.fetchItemStockModal();
    for (const item of invoiceItems){
      const totalQty = itemStocks
        .filter(stock => stock.item_id === item.item_id)
        .reduce((sum, s) => sum + s.qty, 0);

      if (totalQty < item.qty) return false;
    }
    return true
  }
}