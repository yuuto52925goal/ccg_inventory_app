import { supabase } from "@/lib/supabase"
import { PurchaseOrderItem, StockItem } from "@/types/supabsePublicType"

export const InvoiceRollBack = async (itemstock: StockItem[]) => {
  const {error} = await supabase.from("ItemStock").insert(itemstock)
  if (!error) throw error
  return;
}

export const purchaseOrderRollBack = async (poItems: PurchaseOrderItem[]) => {
  const stockIds = poItems
    .map(item => item.stock_id)
    .filter((id): id is number => id !== undefined);
  const {error} = await supabase.from("ItemStock")
    .delete()
    .in('stock_id', stockIds)
  if (!error) throw error
  return;
}