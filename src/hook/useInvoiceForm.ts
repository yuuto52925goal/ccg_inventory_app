import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { InvoiceType, InvoiceItemType } from "@/types/supabsePublicType";
import { useCustomer } from "./useCustomer";
import { useInventoryStock } from "./useInventoryStock";
import { useAuth } from "@/context/AuthProvider";

export const useInvoiceForm = () => {
  const [selectedItems, setSelectedItems] = useState<InvoiceItemType[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { items } = useInventoryStock()
  const { customers,  addCustomer, refetch} = useCustomer();
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
    if (selectedItems.length === 0 || !user?.id) {
      setMessage("Please select a customer and add at least one item.");
      setLoading(false);
      return;
    }
    // Insert invoice
    const { data: invoiceData, error: invoiceError } = await supabase
      .from("Invoice")
      .insert({
        user_id: user?.id,
        total_amount: getTotal(),
        is_paid: false,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();
    if (invoiceError) {
      setMessage(invoiceError.message);
      setLoading(false);
      return;
    }
    const invoice_id = invoiceData.invoice_id;
    // Insert invoice items
    const invoiceItems: InvoiceItemType[] = selectedItems.map((item) => ({
      item_id: item.item_id,
      invoice_id,
      qty: item.qty,
      sell_price: item.sell_price,
      line_part: item.line_part,
    }));
    const { error: itemError } = await supabase.from("InvoiceItem").insert(invoiceItems);
    if (itemError) {
      setMessage(itemError.message);
      setLoading(false);
      return;
    }
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