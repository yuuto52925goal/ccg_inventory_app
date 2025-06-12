'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

interface AddNewItemModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddNewItemModal({ onClose, onSuccess }: AddNewItemModalProps) {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [strength, setStrength] = useState('');
  const [size, setSize] = useState('');
  const [dinNumber, setDinNumber] = useState('');
  const [defaultPrice, setDefaultPrice] = useState<number | ''>('');
  const [defaultCost, setDefaultCost] = useState<number | ''>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('Item').insert({
      item_name: itemName,
      description,
      strength,
      size,
      din_number: dinNumber,
      default_price: defaultPrice,
      default_cost: defaultCost
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
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
        {message && <p className="text-red-600 mb-2">{message}</p>}
        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            type="text"
            placeholder="Item Name"
            className="border p-2 rounded"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Strength"
            className="border p-2 rounded"
            value={strength}
            onChange={(e) => setStrength(e.target.value)}
          />
          <input
            type="text"
            placeholder="Size"
            className="border p-2 rounded"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
          <input
            type="text"
            placeholder="Din Number"
            className="border p-2 rounded"
            value={dinNumber}
            onChange={(e) => setDinNumber(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            className="border p-2 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            placeholder="Default Price"
            className="border p-2 rounded"
            value={defaultPrice}
            onChange={(e) => setDefaultPrice(e.target.value === '' ? '' : Number(e.target.value))}
          />
          <input
            type="number"
            placeholder="Default Cost"
            className="border p-2 rounded"
            value={defaultCost}
            onChange={(e) => setDefaultCost(e.target.value === '' ? '' : Number(e.target.value))}
          />
          
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="bg-gray-300 text-black px-4 py-2 rounded"
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