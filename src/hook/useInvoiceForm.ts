import { useState } from "react";
import { InvoiceType, InvoiceItemType } from "@/types/supabsePublicType";
import { useCustomer } from "./useCustomer";
import { useInventoryStock } from "./useInventoryStock";
import { useAuth } from "@/context/AuthProvider";
import { useRestApi } from "@/context/RestApiProvider";

export const useInvoiceForm = () => {
  const [selectedItems, setSelectedItems] = useState<InvoiceItemType[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { items } = useInventoryStock()
  const { customers,  addCustomer, refetch} = useCustomer();
  const {restService} = useRestApi()
  const { user } = useAuth();
  const [invoice, setInvoice] = useState<InvoiceType>({
    created_at: "",
    customer_id: 0,
    user_id: 0,
    total_amount: 0,
    is_paid: false,
  })


  const handleChangeItem = (index: number, field: "item_id" | "qty" | "sell_price", value: string | number) => {
    const updated = [...selectedItems];
    if (field === "item_id") {
      updated[index][field] = Number(value);
      // Optionally set default sell_price
      const default_price = items.find((item) => item.item_id === Number(value))?.cost_price ?? 1;
      updated[index].sell_price = default_price;
    } else {
      updated[index][field] = Number(value);
    }
    updated[index].line_part = updated[index].qty * updated[index].sell_price;
    setSelectedItems(updated);
  };

  const addItem = () => {
    setSelectedItems([
      ...selectedItems,
      { item_id: 0, qty: 1, sell_price: 1, line_part: 0 },
    ]);
  };

  const addItemWithDetails = (itemId: number, qty: number, price: number, item_name: string) => {
    setSelectedItems([
      ...selectedItems,
      { item_id: itemId, qty: qty, sell_price: price, line_part: qty * price, item_name: item_name },
    ]);
  };

  const removeItem = (index: number) => {
    setSelectedItems(selectedItems.filter((_, i) => i !== index));
  };

  const getTotal = () => selectedItems.reduce((acc, i) => acc + i.line_part, 0);

  const submit = async () => {
    setLoading(true);
    setMessage("");
    if (selectedItems.length === 0 || !user?.id || !user.user_id) {
      setMessage("Please select a customer and add at least one item.");
      setLoading(false);
      return;
    }
    // Process Invocie
    if (!restService) {
      setMessage("Error in rest api service.");
      setLoading(false);
      return;
    }
    const newInvoice = { ...invoice, user_id: user.user_id, total_amount: getTotal() };
    await restService.processInvoice({invoice: newInvoice, invoiceItems: selectedItems})
    setMessage("Invoice created successfully!");
    setSelectedItems([]);
    setLoading(false);
  };

  return {
    customers,
    items,
    selectedItems,
    setSelectedItems,
    handleChangeItem,
    addItem,
    addItemWithDetails,
    removeItem,
    getTotal,
    submit,
    message,
    loading,
    invoice,
    setInvoice,
    addCustomer,
    refetch
  };
};