"use client";

import { useState } from "react";
import { InventoryType } from "@/types/supabsePublicType";

interface AddItemModalProps {
  onClose: () => void;
  onAddItem: (item: InventoryType, qty: number, price: number) => void;
  items: InventoryType[];
}

export default function AddItemModal({ onClose, onAddItem, items }: AddItemModalProps) {
  const [selectedItem, setSelectedItem] = useState<InventoryType | null>(null);
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItem) {
      onAddItem(selectedItem, qty, price);
    }
  };

  const handleItemSelect = (itemId: number) => {
    const item = items.find(i => i.item_id === itemId);
    if (item) {
      setSelectedItem(item);
      setPrice(item.cost_price);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-[#1e293b] text-white rounded-xl p-6 w-full max-w-md mx-4 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add Item to Invoice</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl font-bold"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Select Item</label>
            <select
              value={selectedItem?.item_id || ""}
              onChange={(e) => handleItemSelect(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-700 bg-[#334155] text-white rounded outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" className="text-gray-400">Choose an item</option>
              {items.map((item) => (
                <option key={item.item_id} value={item.item_id} className="text-gray-900">
                  {item.item_name} (Stock: {item.quantity})
                </option>
              ))}
            </select>
          </div>

          {selectedItem && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Quantity</label>
                  <input
                    type="number"
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-700 bg-[#334155] text-white rounded outline-none focus:ring-2 focus:ring-blue-500"
                    min="1"
                    max={selectedItem.quantity}
                    required
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Available: {selectedItem.quantity}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Price</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-700 bg-[#334155] text-white rounded outline-none focus:ring-2 focus:ring-blue-500"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className="bg-[#334155] p-3 rounded-md mt-2">
                <h3 className="font-medium mb-2">Item Details</h3>
                <div className="text-sm text-gray-200 space-y-1">
                  <p><strong>Name:</strong> {selectedItem.item_name}</p>
                  <p><strong>Cost Price:</strong> ${selectedItem.cost_price}</p>
                  <p><strong>Available Quantity:</strong> {selectedItem.quantity}</p>
                  <p><strong>Line Total:</strong> ${(qty * price).toFixed(2)}</p>
                </div>
              </div>
            </>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!selectedItem}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}