'use client'

import { useState } from 'react';
import { useItem } from '@/hook/useItem';
import type { Item } from '@/types/supabsePublicType';
import AddItemModal from './AddItemModal';
import EditItemModal from './EditItemModal';

const ItemList = () => {
  const { items, loading, error, addItem, updateItem } = useItem();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const handleAdd = async (item: Omit<Item, 'item_id'>) => {
    await addItem(item as Item);
    setShowAddModal(false);
  };

  const handleEdit = async (item: Item) => {
    await updateItem(item);
    setShowEditModal(false);
    setSelectedItem(null);
  };

  // const handleDelete = async (itemId: number) => {
  //   await deleteItem(itemId);
  // };

  return (
    <div className="p-6 bg-[#0f172a] min-w-full text-white shadow">
      {error && <p className="mb-4 text-red-400">{error}</p>}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Items</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded" onClick={() => setShowAddModal(true)}>
          Add Item
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm bg-[#1e293b]">
          <thead className="bg-[#334155] text-white">
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Strength</th>
              <th className="border px-4 py-2">Size</th>
              <th className="border px-4 py-2">DIN</th>
              <th className="border px-4 py-2">Default Price</th>
              <th className="border px-4 py-2">Default Cost</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Edit</th>
              {/* <th className="border px-4 py-2">Delete</th> */}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={10} className="text-center p-4">Loading...</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={10} className="text-center p-4">No items found.</td></tr>
            ) : (
              items.map((item) => (
                <tr key={item.item_id} className="hover:bg-[#475569]">
                  <td className="border px-4 py-2">{item.item_id}</td>
                  <td className="border px-4 py-2">{item.name}</td>
                  <td className="border px-4 py-2">{item.strength}</td>
                  <td className="border px-4 py-2">{item.size}</td>
                  <td className="border px-4 py-2">{item.din_number}</td>
                  <td className="border px-4 py-2">{item.default_price}</td>
                  <td className="border px-4 py-2">{item.default_cost}</td>
                  <td className="border px-4 py-2">{item.description}</td>
                  <td className="border px-4 py-2 bg-blue-400 cursor-pointer hover:bg-blue-600" onClick={() => { setSelectedItem(item); setShowEditModal(true); }}>Edit</td>
                  {/* <td className="border px-4 py-2 bg-red-400 cursor-pointer hover:bg-red-600" onClick={() => handleDelete(item.item_id)}>Delete</td> */}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {showAddModal && (
        <AddItemModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAdd}
        />
      )}
      {showEditModal && selectedItem && (
        <EditItemModal
          item={selectedItem}
          onClose={() => { setShowEditModal(false); setSelectedItem(null); }}
          onSave={handleEdit}
        />
      )}
    </div>
  );
};

export default ItemList;