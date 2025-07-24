import { useEffect, useState } from "react";
import * as InvoiceDao from '@/lib/repositories/invoice';
import type { InvoiceRecord } from "@/lib/schemas/invoiceSchemas";

export function useInvoice() {
  const [invoices, setInvoices] = useState<InvoiceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await InvoiceDao.fetchInvoice();
      setInvoices(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch invoices");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  const deleteInvoice = async (invoiceId: number) => {
    setLoading(true);
    setError(null);
    try {
      await InvoiceDao.deleteInvoice(invoiceId);
      await InvoiceDao.deleteInvoiceItems(invoiceId);
      await refetch();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete invoice");
    } finally {
      setLoading(false);
    }
  };

  return { invoices, loading, error, deleteInvoice };
}
