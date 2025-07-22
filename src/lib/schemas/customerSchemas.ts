import { z } from "zod";

// Address schema
const AddressSchema = z.object({
  address_id: z.number(),
  address_name: z.string(),
  city: z.string(),
  country: z.string(),
  state: z.string(),
  zip: z.string(),
});

// Customer schema
export const CustomerWithAddressSchema = z.object({
  customer_id: z.number(),
  business_name: z.string(),
  email: z.string(),
  fax: z.string(),
  phone: z.string(),
  payment_term: z.string(),
  created_at: z.string(),
  address_id: z.number(),
  Address: AddressSchema,
});

export type CustomerWithAddress = z.infer<typeof CustomerWithAddressSchema>;