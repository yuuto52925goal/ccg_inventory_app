'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

interface ExtendedUser extends User {
  user_id?: string;
}

interface AuthContextType {
  user: ExtendedUser | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<ExtendedUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const authUser = sessionData.session?.user;
      if (!authUser) {
        setUser(null);
        setLoading(false);
        return;
      }
      const { data: userData, error } = await supabase
        .from('User')
        .select('*')
        .eq('email', authUser.email)
        .maybeSingle();

      if (error || !userData) {
        console.error("No user found in User table", error);
        setUser(authUser);
      } else {
        const extendedUser: ExtendedUser = {
          ...authUser,
          ...userData,
        };
        setUser(extendedUser);
        setLoading(false);
      };
    };

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        getSession();
      } else {
        setUser(null);
      }
    });
  
    getSession();

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);