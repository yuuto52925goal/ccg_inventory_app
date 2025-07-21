import { supabase } from "@/lib/supabase";
import { InvoiceType } from "@/types/supabsePublicType";

export class InvoiceDAO{
  public async postInvoice(invoiceData: InvoiceType): Promise<InvoiceType>{
    const {data, error} = await supabase
      .from('Invoice')
      .insert(invoiceData)
      .select()
      .single()
    if (error) throw error;
    return data as InvoiceType;
  }
}