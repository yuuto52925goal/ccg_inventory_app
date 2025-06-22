import VendorList from '@/components/vendor/VendorList';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function VendorsPage() {
  return (
    <ProtectedRoute>
      <div className="p-6 bg-[#0f172a] min-h-screen text-white">
        <VendorList />
      </div>
    </ProtectedRoute>
  );
}