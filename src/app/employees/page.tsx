export default function EmployeesPage() {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Employees</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Full Name" className="border p-2" />
          <input type="text" placeholder="Position" className="border p-2" />
          <input type="text" placeholder="Employee ID" className="border p-2" />
          <input type="text" placeholder="Email" className="border p-2" />
          <input type="number" placeholder="Hourly Rate ($)" className="border p-2" />
          <input type="number" placeholder="Hours Worked" className="border p-2" />
        </form>
  
        <div className="mt-8">
          <h3 className="text-xl font-medium mb-2">Payment Records</h3>
          <table className="min-w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Date</th>
                <th className="border p-2">Employee</th>
                <th className="border p-2">Hours</th>
                <th className="border p-2">Rate</th>
                <th className="border p-2">Total</th>
                <th className="border p-2">Paid</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">2024-06-05</td>
                <td className="border p-2">John Doe</td>
                <td className="border p-2">40</td>
                <td className="border p-2">$25</td>
                <td className="border p-2">$1,000</td>
                <td className="border p-2">Yes</td>
              </tr>
              {/* More records can be dynamically added here */}
            </tbody>
          </table>
        </div>
      </div>
    );
  }