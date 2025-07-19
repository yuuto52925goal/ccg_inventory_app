import { supabase } from "@/lib/supabase";
import { Address } from "@/types/supabsePublicType";

export const fetchAddress = async (): Promise<Address[]> => {
    const {data, error} = await supabase
      .from("Address")
      .select('*')
    if (error) throw error;
    return data as Address[]
}