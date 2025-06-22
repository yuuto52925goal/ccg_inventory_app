import PageLayout from '@/components/common/PageLayout';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
        <PageLayout>
          {children}
        </PageLayout>
    </ProtectedRoute>
  );
}