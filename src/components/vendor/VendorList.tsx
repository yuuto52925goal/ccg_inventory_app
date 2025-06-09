'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import AddVendorModal from './AddVendorModal';
import { Vendor } from '@/types/supabsePublicType';
import UpdateVendorModal from './UpdateVendorModal';

export default function VendorList() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [message, setMessage] = useState('');
  const [showAddVendorModal, setShowAddVendorModal] = useState(false);
  const [showUpdateVendorModal, setShowUpdateVendorModal] = useState(false);
  const [vendorToUpdate, setVendorToUpdate] = useState<Vendor | null>(null);

  const fetchVendors = async () => {
    const { data, error } = await supabase.from('Vendor').select('*');
    if (error) setMessage(error.message);
    else setVendors(data);
  };

  const editVendor = async (business_name: string) => {
    const { data, error } = await supabase.from('Vendor').select('*').eq('business_name', business_name);
    if (error) setMessage(error.message);
    else {
      setShowUpdateVendorModal(true);
      setVendorToUpdate(data[0]);
    }
  };

  const deleteVendor = async (business_name: string) => {
    const { error } = await supabase.from('Vendor').delete().eq('business_name', business_name);
    if (error) setMessage(error.message);
    else {
      setMessage('Vendor deleted successfully');
      fetchVendors();
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  return (
    <div>
      {message && <p className="mb-4 text-red-600">{message}</p>}
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-semibold mb-4">Vendors</h2>
        <button className="bg-blue-500 text-white p-2 rounded-md" onClick={() => setShowAddVendorModal(true)}>Add Vendor</button>
      </div>
      <table className="min-w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Address</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Fax</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor) => (
            <tr key={vendor.business_name}>
              <td className="border p-2">{vendor.business_name}</td>
              <td className="border p-2">{vendor.address_id}</td>
              <td className="border p-2">{vendor.phone}</td>
              <td className="border p-2">{vendor.email}</td>
              <td className="border p-2">{vendor.fax}</td>
              <td className="border p-2 cursor-pointer text-blue-500" onClick={() => editVendor(vendor.business_name)}>Edit</td>
              <td className="border p-2 cursor-pointer text-red-500" onClick={() => deleteVendor(vendor.business_name)}>Delete</td>
            </tr>
          ))}
        </tbody>
      </table>
      {showAddVendorModal && <AddVendorModal onClose={() => setShowAddVendorModal(false)} onSuccess={fetchVendors} />}
      {showUpdateVendorModal && vendorToUpdate && <UpdateVendorModal vendor={vendorToUpdate} onClose={() => setShowUpdateVendorModal(false)} onSuccess={fetchVendors} />}
    </div>
  );
}
