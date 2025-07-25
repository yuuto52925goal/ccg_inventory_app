import { supabase } from "@/lib/supabase"
import { PurchaseOrderItem} from "@/types/supabsePublicType"
import * as ItemStockDao from '@/lib/repositories/itemStock'

export const InvoiceRollBack = async (invoiceDeducts: ItemStockDao.InvoiceDeduct[]) => {
  const { error } = await supabase.rpc('rollback_item_stock', {
    invoice_deducts: invoiceDeducts,
  });

  if (error) {
    console.error("Error adding item stock:", error);
    throw error;
  }

  return "Stock updated successfully!";
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