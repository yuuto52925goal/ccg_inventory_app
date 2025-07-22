import { useEffect, useState } from "react";
import { fetchItem } from "@/lib/repositories/item/fetchData";
import type { Item } from "@/types/supabsePublicType";

export function useItem() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
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
    };
    fetchData();
  }, []);

  return { items, loading, error };
}
