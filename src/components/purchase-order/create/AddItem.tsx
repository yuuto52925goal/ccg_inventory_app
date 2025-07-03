'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

interface AddNewItemModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddNewItemModal({ onClose, onSuccess }: AddNewItemModalProps) {
  const [itemData, setItemData] = useState({
    item_name: '',
    description: '',
    strength: '',
    size: '',
    din_number: '',
    default_price: '',
    default_cost: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (field: string, value: string | number) => {
    setItemData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from('Item').insert({
      name: itemData.item_name,
      description: itemData.description,
      strength: itemData.strength,
      size: itemData.size,
      din_number: itemData.din_number,
      default_price: itemData.default_price === '' ? null : Number(itemData.default_price),
      default_cost: itemData.default_cost === '' ? null : Number(itemData.default_cost),
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage('');
      onSuccess();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#1e293b] text-white p-6 rounded shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
        {message && <p className="text-red-400 mb-2">{message}</p>}
        <form onSubmit={handleSubmit} className="grid gap-4">
          {['item_name', 'strength', 'size', 'din_number', 'description', 'default_price', 'default_cost'].map((field) => (
            <input
              key={field}
              type="text"
              placeholder={field.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())}
              className="border border-gray-500 bg-[#0f172a] text-white p-2 rounded"
              value={itemData[field as keyof typeof itemData]}
              onChange={(e) => handleChange(field, e.target.value)}
              required={field === 'item_name'}
            />
          ))}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="bg-gray-400 text-black px-4 py-2 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}