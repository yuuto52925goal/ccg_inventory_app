import PageLayout from '@/components/common/PageLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { RestApiProvider } from '@/context/RestApiProvider';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <RestApiProvider>
        <PageLayout>
          {children}
        </PageLayout>
      </RestApiProvider>
    </ProtectedRoute>
  );
}