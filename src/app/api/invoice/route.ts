import { NextResponse } from 'next/server';
// import { InvoiceService } from '@/services/invoiceService';

export const POST = async () => {
  try {
    // const body = await req.json();
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