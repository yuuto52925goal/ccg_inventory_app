import { supabase } from "@/lib/supabase";
import { InventoryType, StockItem } from "@/types/supabsePublicType";

export const fetchItemStock = async (): Promise<StockItem[]> => {
  const { data, error } = await supabase
    .from('ItemStock')
    .select('*');

  if (error) {
    throw error;
  }

  return data as StockItem[];
};

export interface ItemGorupByNameType {
  item_id: number,
  item_name: string,
  qty: number,
  average_cost: number,
}

export const fetchItemStockModal = async () => {
  console.log("Group by item rpc")
  const { data, error } = await supabase
    .rpc('get_items_grouped_by_item');

  if (error) {
    throw error;
  }

  return data as ItemGorupByNameType[];
};

export const fetchInventoryStock = async (): Promise<InventoryType[]>  => {
  const {data, error} = await supabase
    .from('ItemStock')
    .select(`
      *,
      Item (*),
      Vendor (*)
    `);
  if (error) throw error;
  const inventoryData: InventoryType[] = data.map(item => ({
    stock_id: item.stock_id,
    vendor_name: item.Vendor.business_name,
    item_name: item.Item.name,
    item_id: item.item_id,
    quantity: item.quantity,
    cost_price: item.cost_price,
    lot_number: item.lot_number,
    expire_date: item.expire_date,
    vendor_id: item.vendor_id
  }));
  return inventoryData
}