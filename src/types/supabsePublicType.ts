export interface Address {
  address_name: string;
  country: string;
  city: string;
  state: string;
  zip: string;
  address_id: number;
}

export interface Vendor {
  vendor_id: number;
  business_name: string;
  address_id: number;
  phone: string;
  email: string;
  fax: string;
}

export interface PurchaseOrder {
  po_id: number;
  created_at: string;
  vendor_id: number;
  user_id: number;
  total_amount: number;
  status: string;
}

export interface PurchaseOrderItem {
  po_id: number;
  item_id: number;
  qty: number;
  cost: number;
  line_total: number;
}

export interface Item {
  item_id: number;
  name: string;
  strength: string;
  size: string;
  din_number: string;
  default_price: number;
  default_cost: number;
  description: string;
}

export interface StockItem {
  item_id: number;
  quantity: number;
  cost_price: number;
  lot_number: string;
  expire_date: string;
  vendor_id: number;
}

export interface InventoryType extends StockItem {
  vendor_name: string;
  item_name: string;
}

export interface CustomerType {
  customer_id: number;
  business_name: string;
  address_id: number;
  phone: string;
  email: string;
  fax: string;
  payment_term: string;
}