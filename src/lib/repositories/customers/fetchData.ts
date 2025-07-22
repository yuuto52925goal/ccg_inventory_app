import { CustomerWithAddressSchema } from "@/lib/schemas/customerSchemas";
import { supabase } from "@/lib/supabase";
import { CustomerType } from "@/types/supabsePublicType";
import z from "zod";

export const fetchCustomers = async (): Promise<CustomerType[]> => {
    const {data, error} = await supabase
      .from('Customer')
      .select('*, Address(*)')
    if (error) throw error;
    const parsed = z.array(CustomerWithAddressSchema).safeParse(data)
    if (!parsed.success) throw new Error("Invliad customer data")
    const customers: CustomerType[] = parsed.data.map((customer) => ({
      customer_id: customer.customer_id,
      business_name: customer.business_name,
      address_id: customer.address_id,
      phone: customer.phone,
      email: customer.email,
      fax: customer.fax,
      payment_term: customer.payment_term,
      address_name: customer.Address?.address_name, // optional chaining
    }));
    return customers;
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