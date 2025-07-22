import { CustomerType } from "@/types/supabsePublicType"
import { useEffect, useState, useCallback } from "react"
import * as customerService from "@/lib/repositories/customers"


export const useCustomer = () => {
  const [customers, setCustomers] = useState<CustomerType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await customerService.fetchCustomers();
      setCustomers(data);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Failed to fetch customers");
    } finally {
      setLoading(false);
    }
  }, []);

  const addCustomer = useCallback(async (newCustomer: CustomerType) => {
    setError(null);
    try {
      await customerService.addCustomer(newCustomer);
      await fetchCustomers();
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Failed to add customer");
    }
  }, [fetchCustomers]);

  const deleteCustomer = useCallback(async (customerId: number) => {
    setError(null);
    try {
      await customerService.deleteCustomer(customerId);
      await fetchCustomers();
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Failed to delete customer");
    }
  }, [fetchCustomers]);

  const updateCustomer = useCallback(async (updatedCustomer: CustomerType) => {
    setError(null);
    try {
      if (customerService.updateCustomer) {
        await customerService.updateCustomer(updatedCustomer);
        await fetchCustomers();
      } else {
        throw new Error('updateCustomer service not implemented');
      }
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Failed to update customer");
    }
  }, [fetchCustomers]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  return { customers, loading, error, addCustomer, deleteCustomer, updateCustomer, refetch: fetchCustomers };
};