'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Address } from '@/types/supabsePublicType';
import AddNewAddressModal from '../address/AddNewAddressModal';

interface AddVendorModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddVendorModal({ onClose, onSuccess }: AddVendorModalProps) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState<number>(1);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [fax, setFax] = useState('');
  const [message, setMessage] = useState('');
  const [addressData, setAddressData] = useState<Address[]>([]);
  const [showAddNewAddressModal, setShowAddNewAddressModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('Vendor').insert({ business_name: name, address_id: address, phone, email, fax });
    if (error) setMessage(error.message);
    else {
      setMessage('');
      onSuccess();
      onClose();
    }
  };

  useEffect(() => {
    const getAddress = async () => {
      const { data, error } = await supabase.from('Address').select('*');
      if (error) setMessage(error.message);
      else {
        setAddressData(data);
        if (data.length > 0) setAddress(data[0].address_id);
      }
    };
    getAddress();
  }, [showAddNewAddressModal]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-[#1e293b] text-white p-6 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add New Vendor</h2>
        {message && <p className="text-red-400 mb-2">{message}</p>}
        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            type="text"
            placeholder="Name"
            className="p-2 bg-[#334155] rounded outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <select
            className="p-2 bg-[#334155] rounded outline-none"
            value={address}
            onChange={(e) => {
              if (e.target.value === 'new') {
                setShowAddNewAddressModal(true);
              } else {
                setAddress(Number(e.target.value));
              }
            }}
          >
            {addressData.map((address) => (
              <option key={address.address_id} value={address.address_id}>{address.address_name}</option>
            ))}
            <option value="new">+ Add new address</option>
          </select>
          {showAddNewAddressModal && <AddNewAddressModal onClose={() => setShowAddNewAddressModal(false)} onSuccess={() => {}} />}
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
          <input 
            type="text"
            placeholder="Fax"
            className="p-2 bg-[#334155] rounded outline-none"
            value={fax}
            onChange={(e) => setFax(e.target.value)}
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
      {showAddNewAddressModal && <AddNewAddressModal onClose={() => setShowAddNewAddressModal(false)} onSuccess={() => {}} />}
    </div>
  );
}
