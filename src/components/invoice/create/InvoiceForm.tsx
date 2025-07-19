"use client";

import { useState } from "react";
import { useInvoiceForm } from "@/hook/useInvoiceForm";
import AddCustomerModal from "@/components/customers/AddCustomerModal";
import { ItemSelect } from "./ItemSelect";
// import { useAuth } from "@/context/AuthProvider";

export default function InvoiceForm() {
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  
  const {
    customers,
    items,
    selectedItems,
    setSelectedItems,
    handleChangeItem,
    removeItem,
    getTotal,
    submit,
    message,
    loading,
    invoice,
    setInvoice,
    addItemWithDetails,
    addCustomer,
    refetch
  } = useInvoiceForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submit();
  };

  return (
    <div className="mr-8 ml-8 mx-auto p-6 bg-gray-800 text-gray-100 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-100 mb-2">
              Customer
            </label>
            <select
              value={invoice.customer_id || ""}
              onChange={(e) => {
                if (e.target.value === "+"){
                  setShowAddCustomerModal(true)
                }else{
                  setInvoice({...invoice, customer_id: Number(e.target.value)})
                }
              }}
              className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" className="text-gray-400">Select a customer</option>
              {customers?.map((customer) => (
                <option key={customer.customer_id} value={customer.customer_id} className="text-gray-900">
                  {customer.business_name}
                </option>
              ))}
              <option value="+" className="text-gray-400">+ Add new customer</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-100 mb-2">
              Invoice Date
            </label>
            <input
              type="date"
              value={invoice.created_at ? new Date(invoice.created_at).toISOString().split('T')[0] : ''}
              onChange={(e) => setInvoice({...invoice, created_at: e.target.value})}
              className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="border border-gray-700 rounded-lg p-4 bg-gray-800">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-100">Invoice Items</h2>
            {/* <button
              type="button"
              onClick={() => setShowAddItemModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add Item
            </button> */}
          </div>
          <ItemSelect
            items={items}
            onAddItem={(item, qty, price, itemName) => {
              addItemWithDetails(item.item_id, qty, price, itemName);
            }}
          />

          {selectedItems.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No items added yet. Click &quot;Add Item&quot; to start.</p>
          ) : (
            <div className="space-y-4">
              {selectedItems.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-4 items-center p-3 bg-gray-900 rounded-md">
                  <div className="col-span-2">
                    <label className="block w-full px-3 py-2 border border-gray-700 bg-gray-800 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">{item.item_name}</label>
                    {/* <select
                      value={item.item_id || ""}
                      onChange={(e) => handleChangeItem(index, "item_id", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      {items?.map((invItem, index) => (
                        <option key={`Index: ${index} & Item id: ${invItem.stock_id}`} value={invItem.item_id} className="text-gray-900">
                          {invItem.item_name}
                        </option>
                      ))}
                    </select> */}
                  </div>
                  
                  <div className="col-span-2">
                    <input
                      type="number"
                      placeholder="Qty"
                      value={item.qty || ""}
                      onChange={(e) => handleChangeItem(index, "qty", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="1"
                      required
                    />
                  </div>
                  
                  <div className="col-span-2">
                    <input
                      type="number"
                      placeholder="Price"
                      value={item.sell_price || ""}
                      onChange={(e) => handleChangeItem(index, "sell_price", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>
                  
                  <div className="col-span-2">
                    <input
                      type="number"
                      placeholder="Total"
                      value={item.line_part || 0}
                      className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-700 text-gray-100"
                      readOnly
                    />
                  </div>
                  
                  <div className="col-span-2">
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="w-full px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Total Section */}
        <div className="flex justify-end">
          <div className="w-64">
            <div className="flex justify-between items-center py-2 border-b border-gray-700">
              <span className="text-lg font-semibold text-gray-100">Total:</span>
              <span className="text-lg font-bold text-blue-400">${getTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Message Display */}
        {message && (
          <div className={`p-4 rounded-md ${
            message.includes("successfully") 
              ? "bg-green-900 text-green-200 border border-green-700" 
              : "bg-red-900 text-red-200 border border-red-700"
          }`}>
            {message}
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => {
              setInvoice({
                created_at: "",
                customer_id: 0,
                user_id: 0,
                total_amount: 0,
                is_paid: false,
              });
              setSelectedItems([])
            }}
            className="px-6 py-2 border border-gray-700 text-gray-100 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating..." : "Create Invoice"}
          </button>
        </div>
      </form>

      {showAddCustomerModal && (
        <AddCustomerModal
          onClose={() => setShowAddCustomerModal(false)}
          onSuccess={refetch}
          addCustomer={addCustomer}
        />
      )}

    </div>
  );
}