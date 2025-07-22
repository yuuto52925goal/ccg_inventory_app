import { Address } from "@/types/supabsePublicType"
import { useCallback, useEffect, useState } from "react"
import * as addressService from '@/lib/repositories/address'

export const useAddress = () => {
  const [addressData, setAddressData] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  
  const fetchAddress = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await addressService.fetchAddress();
      setAddressData(data)
    }catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Failed to fetch customers");
    } finally {
      setLoading(false);
    }
  }, [])

  const updateAddress = useCallback(async (address: Address) => {
    setLoading(true)
    setError(null)
    try {
      await addressService.updateAddress(address)
    }catch(err: unknown){
      if (err instanceof Error) setError(err.message);
      else setError("Failed to fetch customers");
    } finally{
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAddress()
  }, [fetchAddress])

  return { addressData, loading,  error, updateAddress, refetch: fetchAddress}
}