'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { PurchaseOrder, PurchaseOrderItem } from '@/types/supabsePublicType';
// import * as itemStock from "@/service/itemStock"

interface OrderListType extends PurchaseOrder {
  items: PurchaseOrderItem[];
  Vendor: {
    business_name: string;
  };
  User: {
    name: string;
  };
  POItem: PurchaseOrderItem[];
}

export default function OrderList() {
  const [orders, setOrders] = useState<OrderListType[]>([]);
  const [message, setMessage] = useState('');
  const [extendedId, setExtendedId] = useState<number>(0);

  const handleExtendedId = (id: number) => {
    setExtendedId(extendedId === id ? 0 : id);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from('PurchaseOrder')
        .select(`*, Vendor (business_name), User (name), POItem!po_id (*, Item(*))`)
        .order('created_at', { ascending: false });
      console.log(data)
      if (error) setMessage(error.message);
      else setOrders(data);
    };
    fetchOrders();
  }, []);

  return (
    <div className="p-6">

      {message && <p className="text-red-400 mb-4">{message}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border bg-[#1e293b]">
          <thead className="bg-[#334155] text-white">
            <tr>
              <th className="px-4 py-2 border">PO ID</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Vendor</th>
              <th className="px-4 py-2 border">User</th>
              <th className="px-4 py-2 border">Total</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Items</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <React.Fragment key={order.po_id}>
                <tr
                  key={order.po_id}
                  className="cursor-pointer hover:bg-[#475569] text-white min-w-full"
                  onClick={() => handleExtendedId(order.po_id)}
                >
                  <td className="px-4 py-2 border">{order.po_id}</td>
                  <td className="px-4 py-2 border">{new Date(order.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-2 border">{order.Vendor?.business_name}</td>
                  <td className="px-4 py-2 border">{order.User?.name}</td>
                  <td className="px-4 py-2 border">${order.total_amount.toFixed(2)}</td>
                  <td className="px-4 py-2 border">{order.status}</td>
                  <td className="px-4 py-2 border">{order.POItem?.length || 0} items</td>
                </tr>
                {extendedId === order.po_id && (
                  <tr className="bg-gray-900 text-white">
                    <td colSpan={7} className="p-4 border">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {order.POItem?.map((item, index) => (
                          <div key={index} className="bg-gray-800 p-4 rounded-lg">
                            <p><strong>Item ID:</strong> {item.item_id}</p>
                            <p><strong>Quantity:</strong> {item.qty}</p>
                            <p><strong>Cost:</strong> ${item.cost.toFixed(2)}</p>
                            <p><strong>Line Total:</strong> ${item.line_total.toFixed(2)}</p>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}