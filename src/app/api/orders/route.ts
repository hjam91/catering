import { NextRequest, NextResponse } from 'next/server';
import { getAllOrders, createOrder } from '@/lib/orderStore';
import { CateringOrder } from '@/types/catering';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    let orders = await getAllOrders();
    if (status && status !== 'all') {
      orders = orders.filter(o => o.status === status);
    }

    return NextResponse.json({ success: true, count: orders.length, orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Basic validation
    if (!body.eventDetails || !body.customer) {
      return NextResponse.json(
        { success: false, message: 'Event details and customer information are required.' },
        { status: 400 }
      );
    }

    const { date, guestCount } = body.eventDetails;
    const { fullName, email, phone } = body.customer;

    if (!date || !guestCount || !fullName || !email || !phone) {
      return NextResponse.json(
        { success: false, message: 'Please provide event date, guest count, name, email, and phone number.' },
        { status: 400 }
      );
    }

    const newOrder = await createOrder(body as Omit<CateringOrder, 'id' | 'createdAt' | 'status'>);

    return NextResponse.json(
      { success: true, message: 'Order submitted successfully', order: newOrder },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating catering order:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create catering order' },
      { status: 500 }
    );
  }
}
