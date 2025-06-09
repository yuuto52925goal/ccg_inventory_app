'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Vendor } from '@/types/supabsePublicType';

interface UpdateVendorModalProps {
  vendor: Vendor;
  onClose: () => void;
  onSuccess: () => void;
}

export default function UpdateVendorModal({ vendor, onClose, onSuccess }: UpdateVendorModalProps) {
  const [name, setName] = useState(vendor.business_name);
  const [address, setAddress] = useState(vendor.address_id);
  const [phone, setPhone] = useState(vendor.phone);
  const [email, setEmail] = useState(vendor.email);
  const [message, setMessage] = useState('');

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase
      .from('Vendor')
      .update({ name, address, phone, email })
      .eq('business_name', vendor.business_name);

    if (error) setMessage(error.message);
    else {
      setMessage('');
      onSuccess();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Update Vendor</h2>
        {message && <p className="text-red-600 mb-2">{message}</p>}
        <form onSubmit={handleUpdate} className="grid gap-4">
          <input
            type="text"
            placeholder="Name"
            className="border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-2 rounded"
            value={address}
            onChange={(e) => setAddress(Number(e.target.value))}
            required
          />
          <input
            type="text"
            placeholder="Phone"
            className="border p-2 rounded"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
