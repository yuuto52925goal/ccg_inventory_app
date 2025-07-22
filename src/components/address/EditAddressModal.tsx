import React, { useState } from "react";
import type { Address } from "@/types/supabsePublicType";

interface EditAddressModalProps {
  address: Address | null;
  onClose: () => void;
  updateAddress: (address: Address) => Promise<void>;
  onSuccess: () => void
}

const EditAddressModal: React.FC<EditAddressModalProps> = ({ address, onClose,updateAddress, onSuccess }) => {
  const [form, setForm] = useState<Address>({
    address_name: address?.address_name || "",
    country: address?.country || "",
    city: address?.city || "",
    state: address?.state || "",
    zip: address?.zip || "",
    address_id: address?.address_id || 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateAddress(form)
    onSuccess()
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#1e293b] text-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{address ? "Edit Address" : "Add Address"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4 grid gap-4">
          <input name="address_name" value={form.address_name} onChange={handleChange} placeholder="Name" className="p-2 bg-[#334155] rounded outline-none" />
          <input name="country" value={form.country} onChange={handleChange} placeholder="Country" className="p-2 bg-[#334155] rounded outline-none" />
          <input name="city" value={form.city} onChange={handleChange} placeholder="City" className="p-2 bg-[#334155] rounded outline-none" />
          <input name="state" value={form.state} onChange={handleChange} placeholder="State" className="p-2 bg-[#334155] rounded outline-none" />
          <input name="zip" value={form.zip} onChange={handleChange} placeholder="Zip" className="p-2 bg-[#334155] rounded outline-none" />
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAddressModal;
