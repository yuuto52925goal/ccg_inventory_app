'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Vendor, Item } from '@/types/supabsePublicType';
import AddVendorModal from '@/components/vendor/AddVendorModal';
import AddNewItemModal from './AddItem';
import Menu from '@/components/common/Menu';

export default function CreatePurchaseOrder() {
  const [vendorId, setVendorId] = useState<number | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [selectedItems, setSelectedItems] = useState<{ item_id: number; qty: number; cost: number; line_total: number }[]>([]);
  const [message, setMessage] = useState('');
  const router = useRouter();
  const [showAddVendor, setShowAddVendor] = useState(false);
  const [showAddItem, setShowAddItem] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      const { data: vendorData } = await supabase.from('Vendor').select('vendor_id, business_name, address_id, phone, email, fax');
      const { data: itemData } = await supabase.from('Item').select('item_id, name, strength, size, din_number, default_price, default_cost, description');
      console.log(itemData)
      if (vendorData) setVendors(vendorData);
      if (itemData) setItems(itemData);
    };
    fetchInitialData();
  }, []);

  const fetchItems = async () => {
    const { data, error } = await supabase.from('Item').select('*');
    if (error) setMessage(error.message);
    else setItems(data);
  };

  const fetchVendors = async () => {
    const { data, error } = await supabase.from('Vendor').select('*');
    if (error) setMessage(error.message);
    else setVendors(data);
  };

  const handleChangeItem = (index: number, field: 'item_id' | 'qty' | 'cost', value: string | number) => {
    const updated = [...selectedItems];
    updated[index][field] = Number(value);
    if (field === 'qty' || field === 'cost') {
      updated[index].line_total = updated[index].qty * updated[index].cost;
    }
    setSelectedItems(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vendorId || selectedItems.length === 0) return;

    const { data: poData, error: poError } = await supabase
      .from('PurchaseOrder')
      .insert({ vendor_id: vendorId, status: 'pending', total_amount: 0 })
      .select()
      .single();

    if (poError) return setMessage(poError.message);

    const po_id = poData.po_id;
    const poItems = selectedItems.map((item) => ({ ...item, po_id }));
    const { error: itemError } = await supabase.from('po_item').insert(poItems);

    if (itemError) return setMessage(itemError.message);

    router.push('/purchase-order');
  };

  return (
    <div className="min-h-screen flex bg-[#0f172a] text-white">
      <Menu/>

      <main className="flex-1 p-6">
        <h2 className="text-3xl font-semibold mb-4">Create New Purchase Order</h2>
        {message && <p className="text-red-600 mb-4">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-6 bg-[#1e293b] p-6 rounded shadow">
          <div>
            <div className='flex items-center justify-between mb-1'>
              <label className="block text-sm font-medium">Vendor</label>
              <button type="button" onClick={() => setShowAddVendor(!showAddVendor)} className="text-sm text-blue-400 underline">
                + Add new vendor
              </button>
            </div>
            <select
              value={vendorId ?? ''}
              onChange={(e) => setVendorId(Number(e.target.value))}
              className="border border-gray-600 bg-[#0f172a] text-white p-2 rounded w-full"
              required
            >
              <option value="">Select Vendor</option>
              {vendors.map((v) => (
                <option key={v.vendor_id} value={v.vendor_id}>
                  {v.business_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Items</label>
            {selectedItems.map((entry, idx) => (
              <div key={idx} className="flex items-center gap-2 mb-2">
                <select
                  value={entry.item_id}
                  onChange={(e) => handleChangeItem(idx, 'item_id', e.target.value)}
                  className="border border-gray-600 bg-[#0f172a] text-white p-2 rounded"
                >
                  {items.map((item) => (
                    <option key={item.item_id} value={item.item_id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  value={entry.qty}
                  onChange={(e) => handleChangeItem(idx, 'qty', e.target.value)}
                  className="border border-gray-600 bg-[#0f172a] text-white p-2 rounded w-24"
                  min={1}
                />
                <input
                  type="number"
                  value={entry.cost}
                  onChange={(e) => handleChangeItem(idx, 'cost', e.target.value)}
                  className="border border-gray-600 bg-[#0f172a] text-white p-2 rounded w-24"
                  min={1}
                />
                Total cost {entry.cost * entry.qty}

                
              </div>
            ))}
            <button type="button" onClick={() => setSelectedItems([...selectedItems, { item_id: items[0]?.item_id || 0, qty: 1, cost: 0, line_total: 0 }])} className="text-blue-400 underline text-sm">
              + Add Item
            </button>
          </div>

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Submit Purchase Order
          </button>
        </form>

        {showAddVendor && (
          <AddVendorModal onClose={() => setShowAddVendor(false)} onSuccess={fetchVendors} />
        )}
        {showAddItem && (
          <AddNewItemModal onClose={() => setShowAddItem(false)} onSuccess={fetchItems} />
        )}
      </main>
    </div>
  );
}