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

  public static async updateUrlInvoice(invoiceId: number, uri: string){
    // if (!invoice_Id) throw "Error not proving invoice id";
    await supabase
     .from("Invoice")
     .update({pdf_url: uri})
     .eq('invoice_id', invoiceId)
  }
}