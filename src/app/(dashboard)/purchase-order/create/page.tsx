import ProtectedRoute from "@/components/ProtectedRoute";
import CreatePurchaseOrder from "@/components/purchase-order/create/CreatePurchseOrder";

 export default function CreatePurchaseOrderPage() {
  return (
    <ProtectedRoute>
      <CreatePurchaseOrder />
    </ProtectedRoute>
  );
}
