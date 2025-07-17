import { supabase } from "@/lib/supabase";
import { CustomerType } from "@/types/supabsePublicType";

export const fetchCustomers = async (): Promise<CustomerType[]> => {
    const {data, error} = await supabase
      .from('Customer')
      .select('*')
    if (error) throw error;
    return data as CustomerType[];
}