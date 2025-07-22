import React from "react";
import type { Address } from "@/types/supabsePublicType";

interface AddressListProps {
  addresses: Address[];
  loading: boolean;
  onEdit: (address: Address) => void;
}

const AddressList: React.FC<AddressListProps> = ({ addresses, loading, onEdit }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border text-sm bg-[#1e293b]">
        <thead className="bg-[#334155] text-white">
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Country</th>
            <th className="border px-4 py-2">City</th>
            <th className="border px-4 py-2">State</th>
            <th className="border px-4 py-2">Zip</th>
            <th className="border px-4 py-2">Edit</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={7} className="text-center p-4">Loading...</td></tr>
          ) : addresses.length === 0 ? (
            <tr><td colSpan={7} className="text-center p-4">No addresses found.</td></tr>
          ) : (
            addresses.map((address) => (
              <tr key={address.address_id} className="hover:bg-[#475569]">
                <td className="border px-4 py-2">{address.address_id}</td>
                <td className="border px-4 py-2">{address.address_name}</td>
                <td className="border px-4 py-2">{address.country}</td>
                <td className="border px-4 py-2">{address.city}</td>
                <td className="border px-4 py-2">{address.state}</td>
                <td className="border px-4 py-2">{address.zip}</td>
                <td className="border px-4 py-2 bg-blue-400 cursor-pointer hover:bg-blue-600" onClick={() => onEdit(address)}>Edit</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AddressList;
