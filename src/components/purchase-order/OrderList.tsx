'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { PurchaseOrder, PurchaseOrderItem } from '@/types/supabsePublicType';
import Link from 'next/link';

interface OrderListType extends PurchaseOrder {
  items: PurchaseOrderItem[];
  Vendor: {
    business_name: string;
  };
  User: {
    username: string;
  };
  PurchaseOrderItem: PurchaseOrderItem[];
}

export default function OrderList() {
    const [orders, setOrders] = useState<OrderListType[]>([]);
    const [message, setMessage] = useState('');
    const [extendedId, setExtendedId] = useState<number>(0);

    const handleExtendedId = (id: number) => {
        setExtendedId(id);
    }
  
    useEffect(() => {
      const fetchOrders = async () => {
        const { data, error } = await supabase
        .from('PurchaseOrder')
        .select(`*, Vendor (business_name), User (name), POItem!po_id (*, Item(*))`)
        .order('created_at', { ascending: false });
        console.log(data);
        if (error) setMessage(error.message);
        else setOrders(data);
      };
      fetchOrders();
    }, []);
  
    return (
      <div className="p-6">
        <Link className="text-blue-500 bg-blue-500 text-white px-4 py-2 rounded-md mb-8" href="/purchase-order/create">Create Purchase Order</Link>
        <h2 className="text-2xl font-semibold mb-4 mt-8">Purchase History</h2>
        {message && <p className="text-red-600 mb-4">{message}</p>}
        <table className="min-w-full border text-sm mt-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">PO ID</th>
              <th className="border p-2">Created At</th>
              <th className="border p-2">Vendor</th>
              <th className="border p-2">User</th>
              <th className="border p-2">Total Amount</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Items</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <>
                <tr key={order.po_id} onClick={() => handleExtendedId(order.po_id)}>
                  <td className="border p-2">{order.po_id}</td>
                  <td className="border p-2">{order.created_at}</td>
                  <td className="border p-2">{order.Vendor?.business_name}</td>
                  <td className="border p-2">{order.User?.username}</td>
                  <td className="border p-2">${order.total_amount.toFixed(2)}</td>
                  <td className="border p-2">{order.status}</td>
                  <td className="border p-2">{order.PurchaseOrderItem?.length || 0} items</td>
                </tr>
                {extendedId === order.po_id && (
                  <tr>
                    <td colSpan={7} className="border p-2">
                      {order.PurchaseOrderItem?.map((item) => (
                        <div key={item.item_id}>
                          <p>Item ID: {item.item_id}</p>
                          <p>Quantity: {item.qty}</p>
                          <p>Cost: ${item.cost.toFixed(2)}</p>
                          <p>Line Total: ${item.line_total.toFixed(2)}</p>
                        </div>
                      ))}
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    );
}
  