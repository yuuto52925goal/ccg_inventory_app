import { useEffect, useState } from 'react';
import { InventoryType } from '@/types/supabsePublicType';
import * as itemStock from '@/service/itemStock';

export const useInventoryStock = () => {
  const [items, setItems] = useState<InventoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const inventoryStock = await itemStock.fetchInventoryStock();
        setItems(inventoryStock);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || "Failed to fetch inventory");
        } else {
          setError("Failed to fetch inventory");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return { items, loading, error };
};