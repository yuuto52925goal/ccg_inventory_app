import { useState, useEffect } from "react";
import { Vendor } from "@/types/supabsePublicType";
import { supabase } from "@/lib/supabase";
import * as VendorDao from '@/lib/repositories/vendor'

export function useVendors() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [message, setMessage] = useState("");
  const [vendorToUpdate, setVendorToUpdate] = useState<Vendor | null>(null);

  const fetchVendors = async () => {
    const fetchedVendors = await VendorDao.fetchVendors()
    setVendors(fetchedVendors);
  };

  const editVendor = async (business_name: string) => {
    const { data, error } = await supabase
      .from("Vendor")
      .select("*")
      .eq("business_name", business_name);
    if (error) setMessage(error.message);
    else setVendorToUpdate(data[0]);
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  return {
    vendors,
    message,
    vendorToUpdate,
    setVendorToUpdate,
    fetchVendors,
    editVendor,
  };
}