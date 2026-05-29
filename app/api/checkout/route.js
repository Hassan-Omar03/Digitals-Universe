import { NextResponse } from "next/server";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    // Extract and validate parameters
    const price = searchParams.get("amount");
    const currency = searchParams.get("currency");

    // Validate required parameters
    if (!price || !currency) {
      console.error("Missing required parameters:", { price, currency });
      return NextResponse.json(
        { error: "Missing amount or currency parameter" },
        { status: 400 }
      );
    }

    // Validate amount is a valid number
    const amount = Number(price);
    if (isNaN(amount) || amount <= 0) {
      console.error("Invalid amount:", price);
      return NextResponse.json(
        { error: "Amount must be a positive number" },
        { status: 400 }
      );
    }

    // Validate Stripe API key is configured
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error("STRIPE_SECRET_KEY is not configured in environment variables");
      return NextResponse.json(
        { error: "Payment system is not configured. Please contact support." },
        { status: 500 }
      );
    }

    // Validate currency code (basic validation)
    const currencyLower = currency.toLowerCase();
    if (currencyLower.length !== 3) {
      console.error("Invalid currency code:", currency);
      return NextResponse.json(
        { error: "Invalid currency code" },
        { status: 400 }
      );
    }

    // Initialize Stripe
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    // Log the checkout session creation attempt
    console.log("Creating checkout session:", {
      amount,
      currency: currencyLower,
      unitAmount: Math.round(amount * 100),
    });

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: currencyLower,
            product_data: {
              name: "Web Services Payment",
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    });

    console.log("Checkout session created successfully:", session.id);

    return NextResponse.json({
      id: session.id,
      url: session.url,
    });

  } catch (error) {
    // Log the full error for debugging
    console.error("Stripe checkout error:", {
      message: error.message,
      type: error.type,
      code: error.code,
      stack: error.stack,
    });

    // Return user-friendly error message
    let errorMessage = "Failed to create checkout session. Please try again.";
    
    // Provide more specific error messages for common issues
    if (error.type === "StripeInvalidRequestError") {
      errorMessage = "Invalid payment request. Please check your input and try again.";
    } else if (error.type === "StripeAuthenticationError") {
      errorMessage = "Payment system authentication failed. Please contact support.";
    } else if (error.message) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
