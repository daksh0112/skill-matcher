import Razorpay from "razorpay";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const order = await razorpay.orders.create({
    amount: 19900, // ₹199 in paise
    currency: "INR",
    receipt: `rcpt_${session.user.id.slice(0, 8)}_${Date.now()}`,
  });

  return NextResponse.json({ orderId: order.id, amount: order.amount });
}
