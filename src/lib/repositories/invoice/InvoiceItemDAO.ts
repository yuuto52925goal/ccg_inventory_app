import { supabase } from "@/lib/supabase"
import { InvoiceItemType } from "@/types/supabsePublicType"

export class InvoiceItemDAO{
  public async postInvoiceItem(invoiceItems: InvoiceItemType[], invoiceId: number){
    const parsedInvoiceItems = invoiceItems.map(item => {
      return {
        item_id: item.item_id,
        invoice_id: invoiceId,
        qty: item.qty,
        sell_price: item.sell_price,
        line_part: item.qty * item.sell_price,
      }
    })
    const {error} = await supabase
     .from('InvoiceItem')
     .insert(parsedInvoiceItems)
    if (error) throw error;
  }
}

export const deleteInvoiceItems = async (invoiceId: number) => {
  const {error} = await supabase.from("InvoiceItem").delete().eq('invoice_id', invoiceId)
  if (!error) throw error
  return;
}