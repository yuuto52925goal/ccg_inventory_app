import React, { useState } from "react";
import type { Item } from "@/types/supabsePublicType";

interface AddItemModalProps {
  onClose: () => void;
  onSave: (item: Omit<Item, 'item_id'>) => void;
}

const AddItemModal: React.FC<AddItemModalProps> = ({ onClose, onSave }) => {
  const [form, setForm] = useState<Omit<Item, 'item_id'>>({
    name: "",
    strength: "",
    size: "",
    din_number: "",
    default_price: 0,
    default_cost: 0,
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#1e293b] text-white p-6 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add Item</h2>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="p-2 bg-[#334155] rounded outline-none" required />
          <input name="strength" value={form.strength} onChange={handleChange} placeholder="Strength" className="p-2 bg-[#334155] rounded outline-none" required />
          <input name="size" value={form.size} onChange={handleChange} placeholder="Size" className="p-2 bg-[#334155] rounded outline-none" required />
          <input name="din_number" value={form.din_number} onChange={handleChange} placeholder="DIN Number" className="p-2 bg-[#334155] rounded outline-none" required />
          <input name="default_price" type="number" value={form.default_price} onChange={handleChange} placeholder="Default Price" className="p-2 bg-[#334155] rounded outline-none" required />
          <input name="default_cost" type="number" value={form.default_cost} onChange={handleChange} placeholder="Default Cost" className="p-2 bg-[#334155] rounded outline-none" required />
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="p-2 bg-[#334155] rounded outline-none" />
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemModal;
