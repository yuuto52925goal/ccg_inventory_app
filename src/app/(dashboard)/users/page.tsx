import ProfileInfo from "@/components/ProfileInfo";
import InviteUserForm from "@/components/InviteUser";
import LogoutButton from "@/components/Logout";

export default function UsersPage() {
  return (
  <div className="bg-[#0f172a] text-white p-6">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">User Settings</h1>
      <LogoutButton />
    </div>
    <div className="bg-[#1e293b] rounded-lg p-6 shadow mb-6">
      <ProfileInfo />
    </div>
    <div className="bg-[#1e293b] rounded-lg p-6 shadow mb-6">
      <InviteUserForm />
    </div>
    {/* <div className="bg-[#1e293b] rounded-lg p-6 shadow">
      <h3 className="text-xl font-medium mb-4">User Access Log</h3>
      <table className="min-w-full text-sm">
        <thead className="bg-[#334155]">
          <tr>
            <th className="text-left p-2">Date</th>
            <th className="text-left p-2">User</th>
            <th className="text-left p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-[#475569]">
            <td className="p-2">2024-06-06</td>
            <td className="p-2">alice@example.com</td>
            <td className="p-2">Edited invoice INV-201</td>
          </tr>
        </tbody>
      </table>
    </div> */}
  </div>
  );
}