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
  const[roles, setRoles] = useState<Role[]>([]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user?.email) return;
    const { data: existingData, error: checkError } = await supabase.from('User').select('*').eq('email', user.email);
    if (checkError) {
      console.error('Error checking user:', checkError);
      return;
    }

    if (existingData.length > 0) {
      // Update existing user
      const { error } = await supabase
        .from('User')
        .update({ name, email: user.email, role_id: roleId })
        .eq('email', user.email)
        .select();
      if (error) console.error('Error updating user:', error);
    } else {
      // Insert new user
      const { error } = await supabase
        .from('User')
        .insert([{ name, email: user.email, role_id: roleId }])
        .select();
      if (error) console.error('Error creating user:', error);
    }
    alert('User updated successfully');
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
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">My Info</h2>
      <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
        <p>Name</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 bg-gray-100"
        />
        <p>Email</p>
        <input
          type="text"
          value={user?.email}
          readOnly
          className="border p-2 bg-gray-100"
        />
        <p>Role</p>
        <select value={roleId} onChange={(e) => setRoleId(parseInt(e.target.value))}>
          {roles.map((role) => (
            <option key={role.role_id} value={role.role_id}>{role.role_name.toUpperCase()}</option>
          ))}
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">Update</button>
      </form>
    </div>
  );
}