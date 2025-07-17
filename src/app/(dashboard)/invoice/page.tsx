import Link from "next/link";

export default function InvoicePage() {
    return (
        <div className="p-6 bg-[#0f172a] w-full min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-white">Invoice</h2>
                <Link href="/invoice/create" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Create New Invoice
                </Link>
            </div>
        </div>
    )
}