import { useEffect, useState } from "react";
import { fetchInvoice } from "@/lib/repositories/invoice/InvoiceDAO";
import type { InvoiceRecord } from "@/lib/schemas/invoiceSchemas";

export function useInvoice() {
  const [invoices, setInvoices] = useState<InvoiceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchInvoice();
        setInvoices(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch invoices");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { invoices, loading, error };
}
