"use client";

import React, { useState } from "react";
import AddressList from "@/components/address/AddressList";
import EditAddressModal from "@/components/address/EditAddressModal";
import { useAddress } from "@/hook/useAddress";
import { Address } from "@/types/supabsePublicType";

export default function AddressPage() {
  const { addressData, loading, error, updateAddress, refetch } = useAddress();
  const [showModal, setShowModal] = useState(false);
  const [editAddress, setEditAddress] = useState<Address | null>(null);

  return (
    <div className="p-6 bg-[#0f172a] text-white shadow min-h-screen">
      {error && <p className="mb-4 text-red-400">{error}</p>}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Addresses</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded" onClick={() => { setEditAddress(null); setShowModal(true); }}>Add Address</button>
      </div>
      <AddressList
        addresses={addressData}
        loading={loading}
        onEdit={(address) => { setEditAddress(address); setShowModal(true); }}
      />
      {showModal && (
        <EditAddressModal
          address={editAddress}
          onClose={() => setShowModal(false)}
          updateAddress={updateAddress}
          onSuccess={refetch}
        />
      )}
    </div>
  );
}
