import ProfileInfo from "@/components/ProfileInfo";
import ProtectedRoute from "@/components/ProtectedRoute";
import InviteUserForm from "@/components/InviteUser";
import LogoutButton from "@/components/Logout";

export default function UsersPage() {
    return (
      <ProtectedRoute>
        <LogoutButton />
        <ProfileInfo />
        <InviteUserForm />
        <div className="p-6">
    
          <div className="mt-8">
            <h3 className="text-xl font-medium mb-2">User Access Log</h3>
            <table className="min-w-full border text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">Date</th>
                  <th className="border p-2">User</th>
                  <th className="border p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">2024-06-06</td>
                  <td className="border p-2">alice@example.com</td>
                  <td className="border p-2">Edited invoice INV-201</td>
                </tr>
                {/* More user activity rows can be loaded here */}
              </tbody>
            </table>
          </div>
        </div>
      </ProtectedRoute>
    );
  }