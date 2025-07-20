"use client"

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import RestService from '@/service/apiService/RestService';
import { useAuth } from './AuthProvider';
import { supabase } from '@/lib/supabase';

interface RestApiContextType {
  restService: RestService | null;
  loading: boolean;
}

const RestApiContext = createContext<RestApiContextType>({ restService: null, loading: true });

export const RestApiProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [restService, setRestService] = useState<RestService | null>(null);
  const tokenRef = useRef<string | null>(null);

  useEffect(() => {
    const setupRestService = async () => {
      setLoading(true);
      if (!user) {
        setRestService(null);
        setLoading(false);
        return;
      }
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData.session?.access_token;
      tokenRef.current = accessToken || null;
      if (accessToken) {
        const service = new RestService(accessToken);
        service.setAuthorized(true);
        setRestService(service);
      } else {
        setRestService(null);
      }
      setLoading(false);
    };
    if (!authLoading) {
      setupRestService();
    }
  }, [user, authLoading]);

  return (
    <RestApiContext.Provider value={{ restService, loading }}>
      {!loading && children}
    </RestApiContext.Provider>
  );
};

export const useRestApi = () => useContext(RestApiContext);
