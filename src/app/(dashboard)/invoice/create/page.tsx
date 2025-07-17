import InvoiceForm from "@/components/invoice/create/InvoiceForm";

export default function CreateInvoicePage () {
    return (
        <div className="p-6 bg-[#0f172a] w-full min-h-screen">
            <h2 className="text-2xl font-semibold mb-4 text-white">Create Invoice</h2>
            <InvoiceForm />
        </div>
    )
}