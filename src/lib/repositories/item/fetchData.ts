import { supabase } from "@/lib/supabase"
import { Item } from "@/types/supabsePublicType"

export const fetchItem = async () => {
  const {data, error} = await supabase
    .from("Item")
    .select("*")
  if (error) throw error
  console.log(data)
  return data as Item[]
}