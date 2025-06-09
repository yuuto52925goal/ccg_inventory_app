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
    console.log(address);
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
        setAddress(data[0].address_id);
      }
    };
    getAddress();
  }, [showAddNewAddressModal]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Add New Vendor</h2>
        {message && <p className="text-red-600 mb-2">{message}</p>}
        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            type="text"
            placeholder="Name"
            className="border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <select
            className="border p-2 rounded"
            value={address}
            onChange={(e) => setAddress(Number(e.target.value))}
          >
            {addressData.map((address) => (
              <option key={address.address_id} value={address.address_id}>{address.address_name}</option>
            ))}
          </select>
          <button
            type="button"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => setShowAddNewAddressModal(true)}
          >
            Add New Address
          </button>
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
          <input 
            type="text"
            placeholder="Fax"
            className="border p-2 rounded"
            value={fax}
            onChange={(e) => setFax(e.target.value)}
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
      {showAddNewAddressModal && <AddNewAddressModal onClose={() => setShowAddNewAddressModal(false)} onSuccess={() => {}} />}
    </div>
  );
}