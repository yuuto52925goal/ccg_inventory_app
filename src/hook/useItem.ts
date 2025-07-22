import { useEffect, useState, useCallback } from "react";
import { fetchItem } from "@/lib/repositories/item/fetchData";
import * as ItemDAO from '@/lib/repositories/item';
import type { Item } from "@/types/supabsePublicType";

export function useItem() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchItem();
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch items");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const addItem = async (item: Item) => {
    setLoading(true);
    setError(null);
    try {
      await ItemDAO.addItem(item);
      await refetch();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add item");
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (item: Item) => {
    setLoading(true);
    setError(null);
    try {
      await ItemDAO.updateItem(item);
      await refetch();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update item");
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (itemId: number) => {
    setLoading(true);
    setError(null);
    try {
      await ItemDAO.deleteItem(itemId);
      setItems((prev) => prev.filter((item) => item.item_id !== itemId));
      await refetch();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete item");
    } finally {
      setLoading(false);
    }
  };

  return { items, loading, error, addItem, updateItem, deleteItem, refetch };
}
