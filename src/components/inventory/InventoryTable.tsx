'use client';
import { useInventoryStock } from '@/hook/useInventoryStock';

export default function InventoryTable() {
  const { items, loading, error } = useInventoryStock();

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-400">{error}</div>;

  return (
    <div>
      <table className="min-w-full border text-sm">
        <thead className="">
          <tr className="cursor-pointer hover:bg-[#475569] text-white">
            <th className="border p-2">Name</th>
            <th className="border p-2">Lot</th>
            <th className="border p-2">Expiry</th>
            <th className="border p-2">Qty</th>
            <th className="border p-2">Cost</th>
            <th className="border p-2">Vendor</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={`${index}-${item.item_id}`} className="cursor-pointer hover:bg-[#475569] text-white">
              <td className="border p-2">{item.item_name}</td>
              <td className="border p-2">{item.lot_number}</td>
              <td className="border p-2">{item.expire_date}</td>
              <td className="border p-2">{item.quantity}</td>
              <td className="border p-2">{item.cost_price}</td>
              <td className="border p-2">{item.vendor_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}