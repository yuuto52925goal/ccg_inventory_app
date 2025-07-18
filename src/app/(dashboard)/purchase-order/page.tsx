import OrderList from '@/components/purchase-order/OrderList';
import Link from 'next/link';

export default function PurchaseOrderPage() {
  return (
    <div className="p-6 bg-[#0f172a] w-full min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white">Purchase Orders</h2>
        <Link href="/purchase-order/create" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Create New
        </Link>
      </div>
      <OrderList />
    </div>
  );
}