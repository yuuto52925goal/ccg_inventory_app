'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isReset, setIsReset] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isReset) {
      if (!email) {
        setMessage('Please enter your email to reset password.');
        return;
      }
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/login/reset-password`,
      });
      setMessage(error ? error.message : 'Password reset email sent.');
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setMessage(error.message);
      } else {
        router.push('/');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-white">
      <div className="w-full max-w-md p-6 bg-[#1e293b] rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isReset ? 'Reset Password' : 'Log In'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 rounded bg-[#334155] border border-[#475569] text-white placeholder-gray-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {!isReset && (
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 rounded bg-[#334155] border border-[#475569] text-white placeholder-gray-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          )}
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded">
            {isReset ? 'Send Reset Link' : 'Log In'}
          </button>
        </form>
        <button
          onClick={() => {
            setIsReset(!isReset);
            setMessage('');
          }}
          className="mt-4 text-sm text-blue-400 hover:text-blue-500 underline block w-full text-center"
        >
          {isReset ? 'Back to login' : 'Forgot password?'}
        </button>
        {message && <p className="mt-2 text-sm text-red-500 text-center">{message}</p>}
      </div>
    </div>
  );
}