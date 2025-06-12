'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Vendor, Item } from '@/types/supabsePublicType';
import AddVendorModal from '@/components/vendor/AddVendorModal';
import AddNewItemModal from './AddItem';
import AddPOItemModal from './AddPOItem';

export default function CreatePurchaseOrder() {
  const [vendorId, setVendorId] = useState<number | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [selectedItems, setSelectedItems] = useState<{ item_id: number; quantity: number }[]>([]);
  const [message, setMessage] = useState('');
  const router = useRouter();
  const [showAddVendor, setShowAddVendor] = useState(false);
  const [showAddItem, setShowAddItem] = useState(false);
  const [showAddPOItem, setShowAddPOItem] = useState(false);

  
  useEffect(() => {
    const fetchInitialData = async () => {
      const { data: vendorData } = await supabase.from('Vendor').select('vendor_id, business_name, address_id, phone, email, fax');
      const { data: itemData } = await supabase.from('Item').select('item_id, name, strength, size, din_number, default_price, default_cost, description');
      if (vendorData) setVendors(vendorData);   
      if (itemData) setItems(itemData);
    };
    fetchInitialData();
  }, []);
  
  const fetchPOItems = async () => {
    setMessage('PO Items fetched');
  };

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

  const handleChangeItem = (index: number, field: 'item_id' | 'quantity', value: string | number) => {
    const updated = [...selectedItems];
    updated[index][field] = field === 'quantity' ? Number(value) : Number(value);
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
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Create New Purchase Order</h2>
      {message && <p className="text-red-600 mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <div className='flex items-center justify-between'>
            <label className="block text-sm font-medium mb-1">Vendor</label>
            <label className='text-sm text-gray-500' onClick={() => setShowAddVendor(!showAddVendor)}> Add new vendor</label>
          </div>
          <select
            value={vendorId ?? ''}
            onChange={(e) => setVendorId(Number(e.target.value))}
            className="border p-2 rounded w-full"
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
                className="border p-2 rounded"
              >
                {items.map((item) => (
                  <option key={item.item_id} value={item.item_id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={entry.quantity}
                onChange={(e) => handleChangeItem(idx, 'quantity', e.target.value)}
                className="border p-2 rounded w-24"
                min={1}
              />
            </div>
          ))}
          <button type="button" onClick={() => setShowAddItem(!showAddPOItem)} className="text-blue-600 underline text-sm">
            + Add Item
          </button>
        </div>

        <div>
            <select className="border p-2 rounded w-full">
              <option value="">complete</option>
              <option value="">pending</option>
              <option value="">cancelled</option>
            </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Purchase Order
        </button>
      </form>
      {showAddVendor && (
        <AddVendorModal  onClose={() => setShowAddVendor(false)} onSuccess={fetchVendors} />
      )}
      {showAddItem && (
        <AddNewItemModal onClose={() => setShowAddItem(false)} onSuccess={fetchItems} />
      )}
      {showAddPOItem && (
        <AddPOItemModal poId={1} onClose={() => setShowAddPOItem(false)} onSuccess={fetchPOItems} />
      )}
        
    </div>
  );
}