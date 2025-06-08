'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add authentication logic here
    if (email && password) {
      router.push('/');
    }
  };

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      console.log(process.env.NEXT_PUBLIC_SUPABASE_URL);
    }else{
        console.log('No supabase key found');
    }

    if (process.env.NEXT_PUBLIC_API_URL) {
        console.log(process.env.NEXT_PUBLIC_API_URL);
    }else{
        console.log('No supabase url found');
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
