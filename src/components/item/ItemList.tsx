'use client'

import { useItem } from '@/hook/useItem';

const ItemList = () => {
  const { items, loading, error } = useItem();

  return (
    <div className="p-6 bg-[#0f172a] min-w-full text-white shadow">
      {error && <p className="mb-4 text-red-400">{error}</p>}
      <h2 className="text-2xl font-bold mb-6">Items</h2>
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
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={8} className="text-center p-4">Loading...</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={8} className="text-center p-4">No items found.</td></tr>
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
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ItemList;