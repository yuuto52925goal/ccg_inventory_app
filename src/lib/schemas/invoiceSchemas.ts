import { z } from "zod";

const ItemSchema = z.object({
  name: z.string(),
});

const InvoiceItemSchema = z.object({
  item_id: z.number(),
  qty: z.number(),
  sell_price: z.number(),
  line_part: z.number(),
  Item: ItemSchema,
});

const CustomerSchema = z.object({
  business_name: z.string(),
});

const UserSchema = z.object({
  name: z.string(),
});

export const InvoiceRecordSchema = z.object({
  is_paid: z.boolean(),
  pdf_url: z.string().nullable().optional(),
  total_amount: z.number(),
  Customer: CustomerSchema,
  User: UserSchema,
  InvoiceItem: z.array(InvoiceItemSchema),
});

export type InvoiceRecord = z.infer<typeof InvoiceRecordSchema>;