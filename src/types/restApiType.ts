import { InvoiceItemType, InvoiceType } from "./supabsePublicType"
import { z } from 'zod';

export type RequestInvoiceType = {
  invoice: InvoiceType,
  invoiceItems: InvoiceItemType[],
}

export const InvoiceItemSchema = z.object({
  invoice_item_id: z.number().optional(),
  item_id: z.number(),
  invoice_id: z.number().optional(),
  qty: z.number(),
  sell_price: z.number(),
  line_part: z.number(),
  item_name: z.string().optional(),
})

export const InvoiceSchema = z.object({
  user_id: z.number(),
  invoice_id: z.number().optional(),
  created_at: z.string(),
  customer_id: z.number(),
  total_amount: z.number(),
  is_paid: z.boolean(),
})

export const RequestInvoiceSchema = z.object({
  invoice: InvoiceSchema,
  invoiceItems: z.array(InvoiceItemSchema)
})

export type RequestInvoice = z.infer<typeof RequestInvoiceSchema>; 

export type InvoiceContext = {
  request: RequestInvoiceType;
  invoiceId?: number;
  pdf?: Buffer;
  // Add whatever you need to pass down the pipe
};