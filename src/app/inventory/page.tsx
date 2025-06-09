import InventoryTable from '@/components/inventory/InventoryTable';

export default function InventoryPage() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Inventory</h2>
      <InventoryTable />
    </div>
  );
}