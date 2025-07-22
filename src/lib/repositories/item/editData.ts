import { supabase } from "@/lib/supabase";
import { Item } from "@/types/supabsePublicType";

export const addItem = async (newItem: Item) => {
  const {error} = await supabase.from('Item').insert({
    name: newItem.name,
    strength: newItem.strength,
    size: newItem.size,
    din_number: newItem.din_number,
    default_price: newItem.default_price,
    default_cost: newItem.default_cost,
    description: newItem.description,
  })
  if (error) throw error;
  return;
}

export const updateItem = async (editItem: Item) => {
  const {item_id, ...fields} = editItem;
  const {error} = await supabase
    .from("Item")
    .update(fields)
    .eq('item_id', item_id)
  if (error) throw error;
  return;
}