import { supabase } from "@/lib/supabase"

export const deleteItem = async (itemId: number) => {
  const {error} = await supabase.from("Item").delete().eq('item_id', itemId)
  if (error) throw error;
}