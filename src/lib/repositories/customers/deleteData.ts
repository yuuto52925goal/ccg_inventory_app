import { supabase } from "@/lib/supabase"

export const deleteCustomer = async (customerId: number): Promise<void> => {
    const { error } = await supabase.from('Customer').delete().eq('customer_id', customerId)
    if (error) throw error;
}