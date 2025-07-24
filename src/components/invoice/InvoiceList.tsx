"use client";

import React, { useState } from "react";
import { useInvoice } from "@/hook/useInvoice";
import type { InvoiceRecord } from "@/lib/schemas/invoiceSchemas";

export const InvoiceList = () => {
  const { invoices, loading, error } = useInvoice();
  const [extendedId, setExtendedId] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setExtendedId(prev => (prev === index ? null : index));
  };

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
                <React.Fragment key={idx}>
                  <tr key={idx} className="text-white min-w-full" onClick={() => handleToggle(idx)}>
                    <td className="px-4 py-2 border">{invoice.Customer?.business_name || '-'}</td>
                    <td className="px-4 py-2 border">{invoice.User?.name || '-'}</td>
                    <td className="px-4 py-2 border">${invoice.total_amount?.toFixed(2) ?? "-"}</td>
                    <td className="px-4 py-2 border">{invoice.InvoiceItem?.length || 0} items</td>
                  </tr>
                  {extendedId === idx && (
                    <tr className="bg-gray-900 text-white">
                      <td colSpan={4} className="p-4 border">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {invoice.InvoiceItem
                          ?.filter(item => item.qty !== 0)
                          ?.map((item, itemIdx) => (
                            <div key={itemIdx} className="bg-gray-800 p-4 rounded-lg">
                              <p><strong>Item Name:</strong> {item.Item?.name ?? '-'}</p>
                              <p><strong>Quantity:</strong> {item.qty}</p>
                              <p><strong>Sell Price:</strong> ${item.sell_price.toFixed(2)}</p>
                              <p><strong>Line Total:</strong> ${item.line_part.toFixed(2)}</p>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};