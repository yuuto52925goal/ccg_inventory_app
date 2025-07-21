import AuthUtil from '@/lib/utils/authUtil';
import InvoiceService from '@/service/apiService/InvoiceService';
import { RequestInvoiceType, RequestInvoiceSchema } from '@/types/restApiType';
import { NextRequest, NextResponse } from 'next/server';
// import { InvoiceService } from '@/services/invoiceService';

export const POST = async (req: NextRequest) => {
  try {
    const user = await AuthUtil.isAuthorized(req)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    const body = await req.json();
    const parsed = RequestInvoiceSchema.safeParse(body);
    if (!parsed.success){
      return NextResponse.json(
        { error: 'Invalid request body', issues: parsed.error.issues },
        { status: 400 }
      );
    }
    const requestData: RequestInvoiceType = parsed.data;
    InvoiceService.ResolveInvoice(requestData)
    return NextResponse.json("Sucess", { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
};

export const GET = async () => {
    try {
        return NextResponse.json("Sucess", { status: 201 });
    }catch (e){
        return NextResponse.json({ error: (e as Error).message }, { status: 500 });
    }
}