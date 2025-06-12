'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface AddPOItemModalProps {
  poId: number;
  onClose: () => void;
  onSuccess: () => void;
}

interface Item {
  id: number;
  name: string;
}

export default function AddPOItemModal({ poId, onClose, onSuccess }: AddPOItemModalProps) {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showNewItemModal, setShowNewItemModal] = useState(false);

  const [newItemName, setNewItemName] = useState('');
  const [newItemError, setNewItemError] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const { data, error } = await supabase.from('Item').select('id, name');
    if (error) {
      setMessage('Failed to load items');
      console.error(error);
    } else {
      setItems(data);
    }
  };

  const handleAdd = async () => {
    if (!selectedItemId || quantity <= 0) {
      setMessage('Please select an item and enter a valid quantity');
      return;
    }

    setLoading(true);
    const { error } = await supabase.from('PurchaseOrderItem').insert({
      po_id: poId,
      item_id: selectedItemId,
      quantity,
    });

    if (error) {
      setMessage('Failed to add item');
      console.error(error);
    } else {
      setMessage('');
      onSuccess();
      onClose();
    }
    setLoading(false);
  };

  const handleCreateNewItem = async () => {
    if (!newItemName.trim()) {
      setNewItemError('Item name cannot be empty');
      return;
    }

    const { data, error } = await supabase.from('Item').insert({ name: newItemName }).select().single();
    if (error) {
      setNewItemError('Failed to create item');
      return;
    }

    setShowNewItemModal(false);
    setNewItemName('');
    setNewItemError('');
    await fetchItems();
    setSelectedItemId(data.id);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#1e293b] text-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add Item to Purchase Order</h2>

        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">Item</label>
          <div className="flex space-x-2">
            <select
              className="w-full border border-gray-600 bg-[#0f172a] text-white rounded p-2"
              value={selectedItemId ?? ''}
              onChange={(e) => setSelectedItemId(Number(e.target.value))}
            >
              <option value="" disabled>Select an item</option>
              {items.map((item) => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
            <button
              type="button"
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => setShowNewItemModal(true)}
            >
              ＋
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Quantity</label>
          <input
            type="number"
            className="w-full border border-gray-600 bg-[#0f172a] text-white rounded p-2"
            value={quantity}
            min={1}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>

        {message && <p className="text-sm text-red-500 mb-3">{message}</p>}

        <div className="flex justify-end space-x-2">
          <button className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700" onClick={onClose}>
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            onClick={handleAdd}
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add'}
          </button>
        </div>
      </div>

      {showNewItemModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-[#1e293b] text-white rounded-lg shadow-lg p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-3">Create New Item</h3>
            <input
              type="text"
              className="w-full border border-gray-600 bg-[#0f172a] text-white p-2 rounded mb-2"
              placeholder="Item name"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
            />
            {newItemError && <p className="text-sm text-red-500 mb-2">{newItemError}</p>}
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700"
                onClick={() => {
                  setShowNewItemModal(false);
                  setNewItemError('');
                  setNewItemName('');
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                onClick={handleCreateNewItem}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}