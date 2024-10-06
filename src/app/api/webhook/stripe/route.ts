import Stripe from "stripe";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabase/admin";

const stripe = new Stripe(process.env.SRTIPE_SK!);
const endpointSecret=process.env.STRIPE_ENDPOINT_SECRET!

export async function POST(req: Request) {
  const rawBody = await req.arrayBuffer();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return new Response(JSON.stringify({ error: "Missing stripe-signature header" }), { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(Buffer.from(rawBody), signature, endpointSecret);
    console.log("Event:", event);

    switch (event.type) {
      case "invoice.payment_succeeded":
        await handlePaymentSucceeded(event.data.object as Stripe.Invoice);
        break;

      case "customer.subscription.deleted":
        await handleCustomerDiscountDeleted(event.data.object as Stripe.Subscription);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err) {
    console.error("Event construction error:", (err as Error).message);
    return new Response(JSON.stringify({ error: `Webhook Error: ${(err as Error).message}` }), { status: 400 });
  }
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  const end_date = new Date(invoice.lines.data[0].period.end * 1000).toISOString();
  const customer_id = invoice.customer as string;
  const subscription_id = invoice.subscription as string;
  const email = invoice.customer_email as string;

  const error = await paymentSucceeded(end_date, customer_id, subscription_id, email);
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

async function handleCustomerDiscountDeleted(discount: Stripe.Subscription) {
  const subscriptionId = discount.id;
  console.log('delete',subscriptionId);
  

  const error = await onSubCancel(subscriptionId);
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

// Define the type for Supabase errors
import { PostgrestError } from "@supabase/supabase-js";

async function paymentSucceeded(
  end_date: string,
  customer_id: string,
  subscription_id: string,
  email: string
): Promise<PostgrestError | null> {
  const supabase = await supabaseAdmin();
  const { error } = await supabase
    .from("subscriptionData")
    .update({
      end_date,
      customer_id,
      subscription_id,
    })
    .eq("email", email);

  return error;
}

async function onSubCancel(subscriptionId: string): Promise<PostgrestError | null> {
  console.log("subid", subscriptionId);
  const supabase = await supabaseAdmin();

  const { error } = await supabase
    .from("subscriptionData")
    .update({
      customer_id: null,
      subscription_id: null,
      end_date:null
    })
    .eq("subscription_id", subscriptionId);

  return error;
}
