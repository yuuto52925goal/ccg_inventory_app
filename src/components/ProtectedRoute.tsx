'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthProvider';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login'); // Redirect to login
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return <>{children}</>;
}