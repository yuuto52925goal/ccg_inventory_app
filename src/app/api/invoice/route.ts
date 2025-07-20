import AuthUtil from '@/lib/utils/authUtil';
import { NextRequest, NextResponse } from 'next/server';
// import { InvoiceService } from '@/services/invoiceService';

export const POST = async (req: NextRequest) => {
  try {
    const user = await AuthUtil.isAuthorized(req)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    const body = await req.json();
    console.log(body)
    // const service = new InvoiceService(body.customerId, body.items);
    // const invoice = await service.create();
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