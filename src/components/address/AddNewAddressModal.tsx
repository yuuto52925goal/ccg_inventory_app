'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

interface AddNewAddressModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddNewAddressModal({ onClose, onSuccess }: AddNewAddressModalProps) {
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('Address').insert({ address_name: street, city, state, zip, country });
    if (error) setMessage(error.message);
    else {
      setMessage('');
      onSuccess();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-[#1e293b] text-white p-6 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add New Address</h2>
        {message && <p className="text-red-400 mb-2">{message}</p>}
        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            type="text"
            placeholder="Street"
            className="p-2 bg-[#334155] rounded outline-none"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="City"
            className="p-2 bg-[#334155] rounded outline-none"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="State"
            className="p-2 bg-[#334155] rounded outline-none"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <input
            type="text"
            placeholder="ZIP Code"
            className="p-2 bg-[#334155] rounded outline-none"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
          <input
            type="text"
            placeholder="Country"
            className="p-2 bg-[#334155] rounded outline-none"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}