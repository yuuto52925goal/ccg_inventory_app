import Link from "next/link";

export default function Dashboard() {
  const tabs = [
    "invoice",
    "purchase-order",
    "customers",
    "vendors",
    "inventory",
    "reports",
    "employees",
    "users",
  ];

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <ul className="grid grid-cols-2 gap-4">
        {tabs.map((tab) => (
          <li key={tab}>
            <Link href={`/${tab}`}>➤ {tab.replace(/-/g, ' ')}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
