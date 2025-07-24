import { supabase } from "@/lib/supabase";
import { InvoiceItemType } from "@/types/supabsePublicType";

export interface InvoiceDeduct {
    stock_id: number
    deducted_qty: number
}

export const deductItemStock = async (invoiceItems: InvoiceItemType[]): Promise<InvoiceDeduct[]> => {
    console.log("Start deduct")
    const {data, error} = await supabase.rpc('deduct_item_stock_fifo', {
        invoice_items: invoiceItems
    })
    console.log(data)
    if (error) throw new Error("Fail rpc function for deduct items")
    // const usedStockIds: number[] = data.map((s: ) => s.stock_id);
    return data as InvoiceDeduct[];
}