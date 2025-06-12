import OrderList from '@/components/purchase-order/OrderList';
import ProtectedRoute from '@/components/ProtectedRoute';
import Menu from '@/components/common/Menu';

export default function PurchaseOrderPage() {
  return (
    <ProtectedRoute>
      <div className="flex bg-[#0f172a] min-h-screen text-white">
          <Menu/>
          <div className="flex-1 p-6">
          <OrderList />
        </div>
      </div>
    </ProtectedRoute>
  );
}