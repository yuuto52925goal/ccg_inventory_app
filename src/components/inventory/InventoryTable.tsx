'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface InventoryItem {
  id: number;
  name: string;
  strength: string;
  size: string;
  din: string;
  lot: string;
  expiry: string;
  quantity: number;
  cost: number;
  vendor_name: string;
}

export default function InventoryTable() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      const { data, error } = await supabase
        .from('ItemStock')
        .select(`
          *,
          Item (*),
          Vendor (*)
        `);
      console.log(data);
      if (error) setMessage(error.message);
      else setItems(data);
    };
    fetchItems();
  }, []);

  return (
    <div>
      {message && <p className="mb-4 text-red-600">{message}</p>}
      <table className="min-w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Strength</th>
            <th className="border p-2">Size</th>
            <th className="border p-2">DIN</th>
            <th className="border p-2">Lot</th>
            <th className="border p-2">Expiry</th>
            <th className="border p-2">Qty</th>
            <th className="border p-2">Cost</th>
            <th className="border p-2">Vendor</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td className="border p-2">{item.name}</td>
              <td className="border p-2">{item.strength}</td>
              <td className="border p-2">{item.size}</td>
              <td className="border p-2">{item.din}</td>
              <td className="border p-2">{item.lot}</td>
              <td className="border p-2">{item.expiry}</td>
              <td className="border p-2">{item.quantity}</td>
              <td className="border p-2">${item.cost.toFixed(2)}</td>
              <td className="border p-2">{item.vendor_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}