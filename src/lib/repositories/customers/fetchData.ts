import { supabase } from "@/lib/supabase";
import { CustomerType } from "@/types/supabsePublicType";

export const fetchCustomers = async (): Promise<CustomerType[]> => {
    const {data, error} = await supabase
      .from('Customer')
      .select('*')
    if (error) throw error;
    return data as CustomerType[];
}

export const fetchCustomerName = async (customerId: number): Promise<string> => {
  const {data, error} = await supabase
    .from("Customer")
    .select('*')
    .eq('customer_id', customerId)
    .single()
  if (error) throw error;
  return data.business_name
}