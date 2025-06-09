export interface Address {
  address_name: string;
  country: string;
  city: string;
  state: string;
  zip: string;
  address_id: number;
}

export interface Vendor {
  business_name: string;
  address_id: number;
  phone: string;
  email: string;
  fax: string;
}