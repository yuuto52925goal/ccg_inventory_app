"use client";

import { useState } from "react";
import { InventoryType } from "@/types/supabsePublicType";

type ItemSelectProps = {
  items: InventoryType[];
  onAddItem: (item: InventoryType, qty: number, price: number, itemName: string) => void;
};

export const ItemSelect = ({ items, onAddItem }: ItemSelectProps) => {
  const [search, setSearch] = useState("");
  const [expandedItemId, setExpandedItemId] = useState<number | null>(null);
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(0);

  const filtered = items.filter(item =>
    item.item_name.toLowerCase().includes(search.toLowerCase())
  );

  const handleExpand = (item: InventoryType) => {
    setExpandedItemId(item.stock_id ?? null);
    setQty(1);
    setPrice(item.cost_price);
  };

  const handleConfirm = (item: InventoryType) => {
    onAddItem(item, qty, price, item.item_name);
    setExpandedItemId(null);
  };

  return (
    <div className="space-y-4 mb-4">
      <input
        type="text"
        placeholder="Search items..."
        className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="w-full text-sm border-collapse mt-2">
        <thead>
          <tr className="text-left text-slate-300 border-b border-gray-600">
            <th className="py-2">Item</th>
            <th>Lot</th>
            <th>Qty</th>
            <th>Expiry</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((item) => (
            <tr
              key={item.item_id + item.lot_number}
              className="hover:bg-gray-700 text-white"
            >
              <td className="py-2 w-1/6">{item.item_name}</td>
              <td className="w-1/6">{item.lot_number}</td>
              <td className="w-1/6">{item.quantity}</td>
              <td className="w-1/6">{item.expire_date}</td>
              <td className="w-2/6">
                {expandedItemId === item.stock_id ? (
                  <div className="mt-2 space-x-2">
                    <input
                      type="number"
                      value={qty}
                      min={1}
                      max={item.quantity}
                      onChange={(e) => setQty(Number(e.target.value))}
                      className="px-2 py-1 w-20 bg-gray-800 text-white border border-gray-600 rounded"
                    />
                    <input
                      type="number"
                      value={price}
                      min={0}
                      step="0.01"
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="px-2 py-1 w-24 bg-gray-800 text-white border border-gray-600 rounded"
                    />
                    <button
                      onClick={() => handleConfirm(item)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      ✔ Add
                    </button>
                    <button
                      onClick={() => setExpandedItemId(null)}
                      className="px-2 py-1 text-sm text-gray-400 hover:text-red-400"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleExpand(item)}
                    className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                  >
                    ➕ Select
                  </button>
                )}
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center text-gray-500 py-4">
                No items found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};