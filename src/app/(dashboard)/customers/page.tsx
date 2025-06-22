export default function CustomersPage() {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Customers</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Business Name" className="border p-2" />
          <input type="text" placeholder="Address" className="border p-2" />
          <input type="text" placeholder="Country" className="border p-2" />
          <input type="text" placeholder="Phone" className="border p-2" />
          <input type="email" placeholder="Email" className="border p-2" />
          <input type="text" placeholder="Fax" className="border p-2" />
          <input type="text" placeholder="Payment Terms" className="border p-2" />
          <input type="text" placeholder="Customer Number" className="border p-2" />
        </form>
  
        <div className="mt-8">
          <h3 className="text-xl font-medium mb-2">Order History</h3>
          <table className="min-w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Date</th>
                <th className="border p-2">Invoice #</th>
                <th className="border p-2">Amount</th>
                <th className="border p-2">Paid</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">2024-06-01</td>
                <td className="border p-2">INV-001</td>
                <td className="border p-2">$1,200.00</td>
                <td className="border p-2">Yes</td>
              </tr>
              {/* More rows dynamically loaded in the future */}
            </tbody>
          </table>
        </div>
      </div>
    );
  }