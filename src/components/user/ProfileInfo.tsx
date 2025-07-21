'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthProvider';
import { supabase } from '@/lib/supabase';

export interface UserData {
  user_id: string;
  created_at: string;
  name: string;
  email: string;
  role_id: number;
}

export interface Role {
  role_id: number;
  role_name: string;
  can_edit: boolean;
  can_invoice: boolean;
  can_do_any: boolean;  
}

export default function ProfilePage() {
  const { user } = useAuth();
  const [name, setName] = useState<string>('');
  const [roleId, setRoleId] = useState<number>(0);
  const [roles, setRoles] = useState<Role[]>([]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user?.email) return;

    const { data: existingData, error: checkError } = await supabase.from('User').select('*').eq('email', user.email);
    if (checkError) {
      console.error('Error checking user:', checkError);
      return;
    }

    if (existingData.length > 0) {
      const { error } = await supabase
        .from('User')
        .update({ name, email: user.email, role_id: roleId })
        .eq('email', user.email)
        .select();
      if (error) console.error('Error updating user:', error);
    } else {
      const { error } = await supabase
        .from('User')
        .insert([{ name, email: user.email, role_id: roleId }])
        .select();
      if (error) console.error('Error creating user:', error);
    }
    alert('✅ User updated successfully');
  };

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.from('User').select('*').eq('email', user?.email);
      if (error) console.error('Error fetching user:', error);
      else if (data && data.length > 0) {
        setName(data[0].name || '');
        setRoleId(data[0].role_id);
      }
    };

    const getRoles = async () => {
      const { data: roleData, error: roleError } = await supabase.from('Role').select('*');
      if (roleError) console.error('Error fetching roles:', roleError);
      else setRoles(roleData);
    };

    if (user) {
      getUser();
      getRoles();
    }
  }, [user]);

  return (
    <div className="p-6 bg-[#1e293b] text-white rounded shadow max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">My Profile</h2>
      <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-1 text-sm text-gray-300">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded bg-[#334155] border border-[#475569] text-white"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm text-gray-300">Email</label>
          <input
            type="text"
            value={user?.email}
            readOnly
            className="w-full p-2 rounded bg-[#334155] border border-[#475569] text-white"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm text-gray-300">Role</label>
          <select
            value={roleId}
            onChange={(e) => setRoleId(parseInt(e.target.value))}
            className="w-full p-2 rounded bg-[#334155] border border-[#475569] text-white"
          >
            {roles.map((role) => (
              <option key={role.role_id} value={role.role_id}>{role.role_name.toUpperCase()}</option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
}