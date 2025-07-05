'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Vendor, Item, PurchaseOrderItem, StockItem } from '@/types/supabsePublicType';
import AddVendorModal from '@/components/vendor/AddVendorModal';
import AddNewItemModal from './AddItem';
import { useAuth } from '@/context/AuthProvider';

export default function CreatePurchaseOrder() {
  const [vendorId, setVendorId] = useState<number | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [selectedItems, setSelectedItems] = useState<{ item_id: number; qty: number; cost: number; line_total: number, lot_number: string, expire: string }[]>([]);
  const [message, setMessage] = useState('');
  const router = useRouter();
  const [showAddVendor, setShowAddVendor] = useState(false);
  const [showAddItem, setShowAddItem] = useState(false);
  const {user} = useAuth();

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

  const handleChangeItem = (index: number, field: 'item_id' | 'qty' | 'cost' | 'lot_number' | 'expire', value: string | number) => {
    const updated = [...selectedItems];
    if (field === 'lot_number' || field === 'expire') {
      updated[index][field] = value as string;
    }else {
      updated[index][field] = Number(value);
      if (field === 'qty' || field === 'cost') {
        updated[index].line_total = updated[index].qty * updated[index].cost;
      }
    }
    setSelectedItems(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Check if selectedItems are available
    const invalidItems = selectedItems.filter((item) => item.lot_number === "" || item.expire === "" || item.qty === 0 || item.cost === 0);
    if (invalidItems.length > 0) {
      setMessage("Please fill in all fields for each item");
      return;
    }

    if (!vendorId || selectedItems.length === 0 || !user) return;
    console.log(user.id)
    const { data: poData, error: poError } = await supabase
      .from('PurchaseOrder')
      .insert({ vendor_id: vendorId, status: 'pending', total_amount: selectedItems.length, user_id:  user.user_id})
      .select()
      .single();
    if (poError) return setMessage(poError.message);
    const po_id = poData.po_id;
    const poItems: PurchaseOrderItem[] = selectedItems.map((item): PurchaseOrderItem => ({ item_id: item.item_id, qty: item.qty, cost: item.cost, line_total: item.line_total, po_id }));
    const { error: itemError } = await supabase.from('POItem').insert(poItems);
    if (itemError) return setMessage(itemError.message);

    // Add items in stock
    const stockItems: StockItem[] = selectedItems.map((item): StockItem => ({ item_id: item.item_id, quantity: item.qty, lot_number: item.lot_number, expire_date: item.expire, vendor_id: vendorId, cost_price: item.cost }));
    console.log(stockItems)
    const { error: stockError } = await supabase.from('ItemStock').insert(stockItems);
    if (stockError) return setMessage(stockError.message);

    router.push('/purchase-order');
  };

  return (
    <div className="min-h-screen flex bg-[#0f172a] text-white">
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
            <div className='flex items-center gap-2 mb-2'>
              <label className="block text-sm font-medium mb-1 p-2 w-37">Item</label>
              <label className="block text-sm font-medium mb-1 p-2 w-33">Lot Number</label>
              <label className="block text-sm font-medium mb-1 p-2 w-38">Expire</label>
              <label className="block text-sm font-medium mb-1 p-2 w-24">qty</label>
              <label className="block text-sm font-medium mb-1 p-2 w-24">price</label>
            </div>
            {selectedItems.map((entry, idx) => (
              <div key={idx} className="flex items-center gap-2 mb-2">
                <select
                  value={entry.item_id}
                  onChange={(e) => {
                    if (e.target.value === 'new') {
                      setShowAddItem(true);
                    } else {
                      handleChangeItem(idx, 'item_id', e.target.value);
                      const default_cost = items.find((item) => item.item_id === entry.item_id)?.default_cost ?? 1;
                      handleChangeItem(idx, "cost", default_cost)
                    }
                  }}
                  className="border border-gray-600 bg-[#0f172a] text-white p-2 rounded"
                >
                  {items.map((item) => (
                    <option key={item.item_id} value={item.item_id}>
                      {item.name}
                    </option>
                  ))}
                  <option value="new">+ Add new item</option>
                </select>
                <input
                  type="text"
                  placeholder="lot number"
                  value={entry.lot_number}
                  onChange={(e) => handleChangeItem(idx, 'lot_number', e.target.value)}
                  className="border border-gray-600 bg-[#0f172a] text-white p-2 rounded w-32"
                />
                <input
                  type="date"
                  value={entry.expire}
                  onChange={(e) => handleChangeItem(idx, 'expire', e.target.value)}
                  className="border border-gray-600 bg-[#0f172a] text-white p-2 rounded"
                />
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
            <button type="button" onClick={() => setSelectedItems([...selectedItems, { item_id: items[0]?.item_id || 0, qty: 1, cost: 0, line_total: 0, expire: "", lot_number: "" }])} className="text-blue-400 underline text-sm">
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