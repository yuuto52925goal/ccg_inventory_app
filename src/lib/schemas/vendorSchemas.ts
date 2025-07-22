
import { z } from "zod";

const AddressSchema = z.object({
  address_id: z.number(),
  address_name: z.string(),
  city: z.string(),
  country: z.string(),
  state: z.string(),
  zip: z.string()
});

export const VendorWithAddressSchema = z.object({
  vendor_id: z.number(),
  business_name: z.string(),
  address_id: z.number(),
  phone: z.string(),
  email: z.string(),
  fax: z.string(),
  Address: AddressSchema.optional()
});

export type VendorWithAddress = z.infer<typeof VendorWithAddressSchema>;