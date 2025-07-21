import { supabase } from "@/lib/supabase";
import { InvoiceItemType } from "@/types/supabsePublicType";

export const deductItemStock = async (invoiceItems: InvoiceItemType[]): Promise<void> => {
    const {error} = await supabase.rpc('deduct_item_stock_fifo', {
        invoice_items: invoiceItems
    })

    if (error) throw new Error("Fail rpc function for deduct items")
    return;
}