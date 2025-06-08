export default function VendorsPage() {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Vendors</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Vendor Name" className="border p-2" />
          <input type="text" placeholder="Address" className="border p-2" />
          <input type="text" placeholder="Country" className="border p-2" />
          <input type="text" placeholder="Phone" className="border p-2" />
          <input type="email" placeholder="Email" className="border p-2" />
          <input type="text" placeholder="Fax" className="border p-2" />
          <input type="text" placeholder="Payment Terms" className="border p-2" />
          <input type="text" placeholder="Vendor ID" className="border p-2" />
        </form>
  
        <div className="mt-8">
          <h3 className="text-xl font-medium mb-2">Order History</h3>
          <table className="min-w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Date</th>
                <th className="border p-2">PO #</th>
                <th className="border p-2">Amount</th>
                <th className="border p-2">Paid</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">2024-06-03</td>
                <td className="border p-2">PO-045</td>
                <td className="border p-2">$980.00</td>
                <td className="border p-2">No</td>
              </tr>
              {/* More rows dynamically loaded in the future */}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  