'use client';

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { useState } from 'react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const data = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Revenue',
      data: [12000, 19000, 3000, 5000, 2000, 30000, 25000],
      backgroundColor: '#6366F1',
    },
    {
      label: 'Expenses',
      data: [8000, 14000, 2000, 2500, 1500, 22000, 20000],
      backgroundColor: '#F59E0B',
    },
  ],
};

export default function DashboardPage() {
  const [search, setSearch] = useState('');

  return (
    <div className="min-h-screen flex bg-[#0f172a] text-white">
      <main className="flex-1 p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <input
            type="text"
            placeholder="Search"
            className="bg-[#1e293b] text-white rounded px-4 py-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#1e293b] p-4 rounded shadow">
            <p className="text-sm text-gray-400">Delivered</p>
            <h3 className="text-xl font-bold">15 New Packages</h3>
          </div>
          <div className="bg-[#1e293b] p-4 rounded shadow">
            <p className="text-sm text-gray-400">Ordered</p>
            <h3 className="text-xl font-bold">72 New Items</h3>
          </div>
          <div className="bg-[#1e293b] p-4 rounded shadow">
            <p className="text-sm text-gray-400">Reported</p>
            <h3 className="text-xl font-bold">72 Support Cases</h3>
          </div>
          <div className="bg-[#1e293b] p-4 rounded shadow">
            <p className="text-sm text-gray-400">Arrived</p>
            <h3 className="text-xl font-bold">34 Upgraded Boxes</h3>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-[#1e293b] p-6 rounded shadow col-span-2">
            <h2 className="text-xl font-semibold mb-4">Daily Revenue Overview</h2>
            <Bar data={data} />
          </div>
          <div className="bg-[#1e293b] p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Support Center</h2>
            <p className="text-sm text-gray-400">
              Any issue or something feedback? Click the button below.
            </p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Contact Us</button>
          </div>
        </div>
        <div className="bg-[#1e293b] p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">My Appointments</h2>
          <table className="min-w-full text-sm">
            <thead className="bg-[#334155]">
              <tr>
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Specialist</th>
                <th className="text-left p-2">Date</th>
                <th className="text-left p-2">Time</th>
                <th className="text-left p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2">Charles Bradley</td>
                <td className="p-2">Dentist</td>
                <td className="p-2">27 Feb, 2020</td>
                <td className="p-2">11:00 AM</td>
                <td className="p-2">✅</td>
              </tr>
              <tr>
                <td className="p-2">Joe Freeman</td>
                <td className="p-2">Therapist</td>
                <td className="p-2">15 Jan, 2020</td>
                <td className="p-2">8:00 PM</td>
                <td className="p-2">✔️</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}