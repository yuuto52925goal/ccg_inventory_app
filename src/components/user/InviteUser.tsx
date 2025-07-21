'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Role } from './ProfileInfo';

export default function InviteUserForm() {
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRoleId, setInviteRoleId] = useState(0);
  const [inviteMessage, setInviteMessage] = useState('');
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    const fetchRoles = async () => {
      const { data, error } = await supabase.from('Role').select('*');
      if (error) console.error('Error fetching roles:', error);
      else setRoles(data);
    };
    fetchRoles();
  }, []);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail || inviteRoleId === 0) {
      setInviteMessage('Please enter a valid email and select a role.');
      return;
    }

    const { data: existingUser } = await supabase.from('User').select('*').eq('email', inviteEmail);
    if (existingUser && existingUser.length > 0) {
      setInviteMessage('User already exists.');
      return;
    }

    const { error: signUpError } = await supabase.auth.signInWithOtp({
      email: inviteEmail,
      options: {
        emailRedirectTo: `${window.location.origin}/login`
      }
    });

    if (signUpError) {
      setInviteMessage(`Signup failed: ${signUpError.message}`);
    } else {
      await supabase.from('User').insert([{ email: inviteEmail, role_id: inviteRoleId }]);
      setInviteMessage(`✅ Invite link sent to ${inviteEmail}`);
      setInviteEmail('');
      setInviteRoleId(0);
    }
  };

  return (
    <div className="mt-12 bg-[#1e293b] text-white p-6 rounded shadow max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Invite New User</h2>
      <form onSubmit={handleInvite} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="email"
          placeholder="User Email"
          value={inviteEmail}
          onChange={(e) => setInviteEmail(e.target.value)}
          className="rounded bg-[#334155] border border-[#475569] p-2 text-white placeholder-gray-400"
          required
        />
        <select
          value={inviteRoleId}
          onChange={(e) => setInviteRoleId(Number(e.target.value))}
          className="rounded bg-[#334155] border border-[#475569] p-2 text-white"
          required
        >
          <option value={0} disabled>Select a role</option>
          {roles.map((role) => (
            <option key={role.role_id} value={role.role_id}>{role.role_name.toUpperCase()}</option>
          ))}
        </select>
        <button type="submit" className="col-span-2 bg-green-600 hover:bg-green-700 text-white py-2 rounded">
          Send Invite
        </button>
      </form>
      {inviteMessage && (
        <p className={`mt-2 text-sm text-center ${inviteMessage.includes('✅') ? 'text-green-400' : 'text-red-400'}`}>
          {inviteMessage}
        </p>
      )}
    </div>
  );
}