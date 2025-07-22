import { InvoiceContext } from "@/types/restApiType";
import { Pipe } from "./Pipe";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { fetchCustomerName } from "../../lib/repositories/customers";
// import { writeFile } from "fs/promises"; // optional for dev local saving
// import { join } from "path";

export class CreatePdfPipe implements Pipe<InvoiceContext> {
  async execute(context: InvoiceContext): Promise<InvoiceContext> {
    const { invoice, invoiceItems } = context.request;
    const customerName = await fetchCustomerName(invoice.customer_id)

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    let y = 750;

    const drawText = (text: string, size = 12) => {
      page.drawText(text, {
        x: 50,
        y,
        size,
        font,
        color: rgb(0, 0, 0),
      });
      y -= size + 6;
    };

    drawText(`Invoice Receipt`, 18);
    drawText(`Date: ${invoice.created_at}`);
    drawText(`Customer Name: ${customerName}`);
    drawText(`--------------------------------`);

    invoiceItems.forEach((item, i) => {
      drawText(`${i + 1}. ${item.item_name || "Item"} - Qty: ${item.qty}, Price: $${item.sell_price}, Total: $${item.line_part}`);
    });

    drawText(`--------------------------------`);
    drawText(`Total Amount: $${invoice.total_amount.toFixed(2)}`, 14);

    const pdfBytes = await pdfDoc.save();

    return {request: context.request, invoiceId: context.invoiceId, pdf: Buffer.from(pdfBytes)};
  }
}
