'use client';

import { useVendors } from "@/hook/useVendors";
import AddVendorModal from "./AddVendorModal";
import UpdateVendorModal from "./UpdateVendorModal";
import { useState } from "react";

export default function VendorList() {
  const {
    vendors,
    message,
    vendorToUpdate,
    fetchVendors,
    editVendor,
  } = useVendors();

  const [showAddVendorModal, setShowAddVendorModal] = useState(false);
  const [showUpdateVendorModal, setShowUpdateVendorModal] = useState(false);

  return (
    <div className="p-6 bg-[#0f172a] text-white rounded-xl shadow">
      {message && <p className="mb-4 text-red-400">{message}</p>}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Vendors</h2>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          onClick={() => setShowAddVendorModal(true)}
        >
          Add Vendor
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm bg-[#1e293b]">
          <thead className="bg-[#334155] text-white">
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Address</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Fax</th>
              <th className="border px-4 py-2">Edit</th>
              {/* <th className="border px-4 py-2">Delete</th> */}
            </tr>
          </thead>
          <tbody>
            {vendors.map((vendor) => (
              <tr key={vendor.business_name} className="hover:bg-[#475569]">
                <td className="border px-4 py-2">{vendor.business_name}</td>
                <td className="border px-4 py-2">{vendor.address_name? vendor.address_name: vendor.address_id}</td>
                <td className="border px-4 py-2">{vendor.phone}</td>
                <td className="border px-4 py-2">{vendor.email}</td>
                <td className="border px-4 py-2">{vendor.fax}</td>
                <td
                  className="border px-4 py-2 bg-blue-400 cursor-pointer hover:bg-blue-600"
                  onClick={() => {
                    editVendor(vendor.business_name);
                    setShowUpdateVendorModal(true);
                  }}
                >
                  Edit
                </td>
                {/* <td className="border px-4 py-2 bg-red-400 cursor-pointer hover:bg-red-600" onClick={() => deleteVendor(vendor.business_name)}>Delete</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddVendorModal && (
        <AddVendorModal
          onClose={() => setShowAddVendorModal(false)}
          onSuccess={fetchVendors}
        />
      )}

      {showUpdateVendorModal && vendorToUpdate && (
        <UpdateVendorModal
          vendor={vendorToUpdate}
          onClose={() => setShowUpdateVendorModal(false)}
          onSuccess={fetchVendors}
        />
      )}
    </div>
  );
}
