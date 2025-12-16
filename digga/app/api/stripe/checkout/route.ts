import Stripe from 'stripe';

// Initialize Stripe securely on the server
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(request: Request) {
  try {
    const { items, customerEmail } = await request.json();

    // Create a Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items,
      mode: 'payment',
      success_url: `${request.headers.get('origin')}/success`,
      cancel_url: `${request.headers.get('origin')}/pricing`,
      customer_email: customerEmail,
    });

    return Response.json({ id: session.id });
  } catch (err) {
    console.error(err);
    return new Response('Failed to create checkout session', { status: 500 });
  }
}