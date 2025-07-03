'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

interface AddNewAddressModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddNewAddressModal({ onClose, onSuccess }: AddNewAddressModalProps) {
  const [formData, setFormData] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const { error } = await supabase.from('Address').insert({
      address_name: formData.street,
      city: formData.city,
      state: formData.state,
      zip: formData.zip,
      country: formData.country,
    });

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

        <div className="grid gap-4">
          <input
            type="text"
            placeholder="Street"
            className="p-2 bg-[#334155] rounded outline-none"
            value={formData.street}
            onChange={(e) => handleChange('street', e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="City"
            className="p-2 bg-[#334155] rounded outline-none"
            value={formData.city}
            onChange={(e) => handleChange('city', e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="State"
            className="p-2 bg-[#334155] rounded outline-none"
            value={formData.state}
            onChange={(e) => handleChange('state', e.target.value)}
          />
          <input
            type="text"
            placeholder="ZIP Code"
            className="p-2 bg-[#334155] rounded outline-none"
            value={formData.zip}
            onChange={(e) => handleChange('zip', e.target.value)}
          />
          <input
            type="text"
            placeholder="Country"
            className="p-2 bg-[#334155] rounded outline-none"
            value={formData.country}
            onChange={(e) => handleChange('country', e.target.value)}
            required
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}