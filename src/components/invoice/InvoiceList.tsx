"use client";

import React from "react";
import { useInvoice } from "@/hook/useInvoice";
import type { InvoiceRecord } from "@/lib/schemas/invoiceSchemas";

export const InvoiceList = () => {
  const { invoices, loading, error } = useInvoice();

  return (
    <div className="p-6">
      {error && <p className="text-red-400 mb-4">{error}</p>}
      {loading ? (
        <p className="text-white">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border bg-[#1e293b]">
            <thead className="bg-[#334155] text-white">
              <tr>
                <th className="px-4 py-2 border">Customer</th>
                <th className="px-4 py-2 border">User</th>
                <th className="px-4 py-2 border">Total</th>
                <th className="px-4 py-2 border">Items</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice: InvoiceRecord, idx) => (
                <tr key={idx} className="text-white min-w-full">
                  <td className="px-4 py-2 border">{invoice.Customer?.business_name || '-'}</td>
                  <td className="px-4 py-2 border">{invoice.User?.name || '-'}</td>
                  <td className="px-4 py-2 border">${invoice.total_amount?.toFixed(2) ?? "-"}</td>
                  <td className="px-4 py-2 border">{invoice.InvoiceItem?.length || 0} items</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};