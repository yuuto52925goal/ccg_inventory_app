import Link from "next/link"

export default function Menu() {

    const tabs = [
        "invoice",
        "purchase-order",
        "customers",
        "vendors",
        "inventory",
        "reports",
        // "employees",
        "users",
      ];

    return (
        <aside className="w-64 bg-[#1e293b] p-6 flex flex-col gap-4">
            <h2 className="text-2xl font-bold mb-6 text-white">CCG</h2>
            <nav className="flex flex-col gap-2">
                {tabs.map((tab) => (
                    <Link href={`/${tab}`} key={tab} className="hover:bg-blue-700 px-3 py-2 rounded text-white">{tab.replace(/-/g, ' ').toUpperCase()}</Link>
                ))}
            </nav>
        </aside>
    )
}