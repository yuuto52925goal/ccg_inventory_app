'use client';

import { useState, useEffect } from 'react';
import { Address, CustomerType } from '@/types/supabsePublicType';
import AddNewAddressModal from '../address/AddNewAddressModal';

interface AddCustomerModalProps {
  onClose: () => void;
  onSuccess: () => void;
  addCustomer: (customer: CustomerType) => Promise<void>;
}

export default function AddCustomerModal({ onClose, onSuccess, addCustomer }: AddCustomerModalProps) {
  const [form, setForm] = useState({
    business_name: '',
    address_id: 1,
    phone: '',
    email: '',
    fax: '',
    payment_term: '',
  });
  const [message, setMessage] = useState('');
  const [addressData, setAddressData] = useState<Address[]>([]);
  const [showAddNewAddressModal, setShowAddNewAddressModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'address_id' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addCustomer({
        ...form,
        customer_id: 0, // Placeholder, backend should assign
      });
      setMessage('');
      onSuccess();
      onClose();
    } catch (error: unknown) {
      if (error instanceof Error) setMessage(error.message);
      else setMessage('Failed to add customer');
    }
  };

  useEffect(() => {
    const getAddress = async () => {
      const res = await fetch('/api/address'); // Replace with your address fetch logic
      if (res.ok) {
        const data = await res.json();
        setAddressData(data);
        if (data.length > 0) setForm((prev) => ({ ...prev, address_id: data[0].address_id }));
      }
    };
    getAddress();
  }, [showAddNewAddressModal]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-[#1e293b] text-white p-6 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add New Customer</h2>
        {message && <p className="text-red-400 mb-2">{message}</p>}
        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            type="text"
            name="business_name"
            placeholder="Business Name"
            className="p-2 bg-[#334155] rounded outline-none"
            value={form.business_name}
            onChange={handleChange}
            required
          />
          <select
            name="address_id"
            className="p-2 bg-[#334155] rounded outline-none"
            value={form.address_id}
            onChange={handleChange}
          >
            {addressData.map((address) => (
              <option key={address.address_id} value={address.address_id}>{address.address_name}</option>
            ))}
            <option value="new">+ Add new address</option>
          </select>
          {showAddNewAddressModal && <AddNewAddressModal onClose={() => setShowAddNewAddressModal(false)} onSuccess={() => {}} />}
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            className="p-2 bg-[#334155] rounded outline-none"
            value={form.phone}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="p-2 bg-[#334155] rounded outline-none"
            value={form.email}
            onChange={handleChange}
          />
          <input 
            type="text"
            name="fax"
            placeholder="Fax"
            className="p-2 bg-[#334155] rounded outline-none"
            value={form.fax}
            onChange={handleChange}
          />
          <input
            type="text"
            name="payment_term"
            placeholder="Payment Term"
            className="p-2 bg-[#334155] rounded outline-none"
            value={form.payment_term}
            onChange={handleChange}
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