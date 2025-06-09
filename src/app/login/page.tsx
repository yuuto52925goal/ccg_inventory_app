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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isReset ? 'Reset Password' : 'Login'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {!isReset && (
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          )}
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
            {isReset ? 'Send Reset Link' : 'Sign In'}
          </button>
        </form>
        <button
          onClick={() => {
            setIsReset(!isReset);
            setMessage('');
          }}
          className="mt-4 text-sm text-blue-600 underline hover:text-blue-800"
        >
          {isReset ? 'Back to login' : 'Forgot password?'}
        </button>
        {message && <p className="mt-2 text-sm text-red-600">{message}</p>}
      </div>
    </div>
  );
}