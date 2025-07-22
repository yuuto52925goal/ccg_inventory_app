import { supabase } from "@/lib/supabase"
import { Address } from "@/types/supabsePublicType"

export const updateAddress = async (address: Address): Promise<void> => {
  const {address_id, ...fields} = address
  const {error} =await supabase
    .from("Address")
    .update(fields)
    .eq('address_id', address_id)
  if (error) throw error;
  return;
}