import { InvoiceRecordSchema } from "@/lib/schemas/invoiceSchemas";
import { supabase } from "@/lib/supabase";
import { InvoiceType } from "@/types/supabsePublicType";
import z from "zod";
import { InvoiceDeduct } from "../itemStock/editData";

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

  public static async updateStockIdInvoice(invoiceId: number, invoiceDeduct: InvoiceDeduct[]){
    await supabase
    .from("Invoice")
    .update({"deduct": invoiceDeduct})
    .eq('invoice_id', invoiceId)
  }
}

export const fetchInvoice = async () => {
  const {data, error} = await supabase
    .from("Invoice")
    .select(`
      *,
      Customer(*),
      InvoiceItem(*, Item(*)),
      User(*)
    `)
  if (error) throw error;
  const parsed = z.array(InvoiceRecordSchema).safeParse(data);
  if (!parsed.success) throw new Error("No parsed successfully")
  console.log(parsed.data)
  return parsed.data;
}

export const deleteInvoice = async (invoiceId: number) => {
  console.log("Delete invocie running", invoiceId)
  const { data, error } = await supabase
    .from("Invoice")
    .delete()
    .eq("invoice_id", invoiceId)
    .select("*")
    .single()

  console.log(data)
  if (error) throw error;
  if (data.deduct){
    return data.deduct as InvoiceDeduct[]
  }else{
    return "No data"
  }
}

