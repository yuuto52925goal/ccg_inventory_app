'use client';

import { useCustomer } from '@/hook/useCustomer';
import AddCustomerModal from './AddCustomerModal';
import UpdateCustomerModal from './UpdateCustomerModal';
import { useState } from 'react';
import { CustomerType } from '@/types/supabsePublicType';

export default function CustomerList() {
  const { customers, loading, error, deleteCustomer, addCustomer, updateCustomer, refetch } = useCustomer();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [customerToUpdate, setCustomerToUpdate] = useState<CustomerType | null>(null);

  return (
    <div className="p-6 bg-[#0f172a] text-white rounded-xl shadow">
      {error && <p className="mb-4 text-red-400">{error}</p>}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Customers</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded" onClick={() => setShowAddModal(true)}>Add Customer</button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm bg-[#1e293b]">
          <thead className="bg-[#334155] text-white">
            <tr>
              <th className="border px-4 py-2">Business Name</th>
              <th className="border px-4 py-2">Address ID</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Fax</th>
              <th className="border px-4 py-2">Payment Term</th>
              <th className="border px-4 py-2">Edit</th>
              <th className="border px-4 py-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={8} className="text-center p-4">Loading...</td></tr>
            ) : customers.length === 0 ? (
              <tr><td colSpan={8} className="text-center p-4">No customers found.</td></tr>
            ) : (
              customers.map((customer) => (
                <tr key={customer.customer_id} className="hover:bg-[#475569]">
                  <td className="border px-4 py-2">{customer.business_name}</td>
                  <td className="border px-4 py-2">{customer.address_id}</td>
                  <td className="border px-4 py-2">{customer.phone}</td>
                  <td className="border px-4 py-2">{customer.email}</td>
                  <td className="border px-4 py-2">{customer.fax}</td>
                  <td className="border px-4 py-2">{customer.payment_term}</td>
                  <td className="border px-4 py-2 bg-blue-400 cursor-pointer hover:bg-blue-600" onClick={() => { setCustomerToUpdate(customer); setShowUpdateModal(true); }}>Edit</td>
                  <td
                    className="border px-4 py-2 bg-red-400 cursor-pointer hover:bg-red-600"
                    onClick={() => customer.customer_id !== undefined && deleteCustomer(customer.customer_id)}
                  >
                    Delete
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {showAddModal && (
        <AddCustomerModal
          onClose={() => setShowAddModal(false)}
          onSuccess={refetch}
          addCustomer={addCustomer}
        />
      )}
      {showUpdateModal && customerToUpdate && (
        <UpdateCustomerModal
          customer={customerToUpdate}
          onClose={() => setShowUpdateModal(false)}
          onSuccess={refetch}
          updateCustomer={updateCustomer}
        />
      )}
    </div>
  );
}