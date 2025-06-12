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
      .update({ business_name: name, address_id: address, phone, email })
      .eq('business_name', vendor.business_name);

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
        <h2 className="text-xl font-bold mb-4">Update Vendor</h2>
        {message && <p className="text-red-400 mb-2">{message}</p>}
        <form onSubmit={handleUpdate} className="grid gap-4">
          <input
            type="text"
            placeholder="Name"
            className="p-2 bg-[#334155] rounded outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Address ID"
            className="p-2 bg-[#334155] rounded outline-none"
            value={address}
            onChange={(e) => setAddress(Number(e.target.value))}
            required
          />
          <input
            type="text"
            placeholder="Phone"
            className="p-2 bg-[#334155] rounded outline-none"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="p-2 bg-[#334155] rounded outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
