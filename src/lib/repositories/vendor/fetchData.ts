import { VendorWithAddressSchema } from "@/lib/schemas/vendorSchemas";
import { supabase } from "@/lib/supabase";
import { Vendor } from "@/types/supabsePublicType";
import z from "zod";

export const fetchVendors = async () => {
  const { data, error } = await supabase.from("Vendor").select("*, Address(*)");

  if (error) throw new Error("Error on Supabase fetch vendor");
  if (!data) return [];

  const parsed = z.array(VendorWithAddressSchema).safeParse(data);
  if (!parsed.success) {
    console.error("Zod validation error:", parsed.error.format());
    throw new Error("Invalid vendor data shape");
  }

  return parsed.data.map(v => ({
    ...v,
    address_name: v.Address?.address_name ?? undefined
  })) as Vendor[];
};