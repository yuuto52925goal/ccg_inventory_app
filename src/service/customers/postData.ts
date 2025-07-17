import { supabase } from "@/lib/supabase";
import { CustomerType } from "@/types/supabsePublicType";

export const addCustomer = async (newCustomer: CustomerType): Promise<void> => {
    const {error} = await supabase.from('Customer').insert(newCustomer)
    if (error) throw error;
    return;
}

export const updateCustomer = async (customer: CustomerType): Promise<void> => {
  const { customer_id, ...fields } = customer;
  const { error } = await supabase
    .from('Customer')
    .update(fields)
    .eq('customer_id', customer_id);
  if (error) throw error;
};