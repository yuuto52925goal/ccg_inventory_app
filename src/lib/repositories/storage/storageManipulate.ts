import { supabase } from "@/lib/supabase"

export const uploadBuffer = async (fileName: string, pdfBuffer: Buffer) => {
  const {error} = await supabase.storage
    .from("invoices")
    .upload(`invoices/${fileName}`, pdfBuffer, {
      contentType: "application/pdf"
    })
  if (error) throw error
  return;
}

export const getPublicURL = async (fileName: string) => {
  const {data} = await supabase.storage
    .from("invoices")
    .getPublicUrl(`invoices/${fileName}`)
  return data.publicUrl
}