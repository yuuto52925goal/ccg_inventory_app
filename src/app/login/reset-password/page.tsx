'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        setMessage('Session not found. Try using the reset link again.');
      }
    });
  }, []);

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setMessage('❌ ' + error.message);
    } else {
      setMessage('✅ Password reset successful! You can now log in.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-white px-4">
      <div className="w-full max-w-md p-6 bg-[#1e293b] shadow-md rounded-xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Reset Password</h1>

        <form onSubmit={handlePasswordReset} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
            required
            className="w-full px-4 py-2 rounded-lg bg-[#334155] border border-[#475569] text-white placeholder-gray-400"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 font-semibold rounded-lg text-white transition ${
              loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>

          {message && (
            <p
              className={`text-sm text-center ${
                message.includes('✅') ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}