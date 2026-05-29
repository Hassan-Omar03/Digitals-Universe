import { NextResponse } from "next/server";
import Stripe from "stripe";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { sessionId } = await req.json();
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    // Verify session with Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid') {
      return NextResponse.json({ 
        success: false, 
        message: 'Payment not completed' 
      });
    }

    // Get payment data from sessionStorage (passed in request)
    const paymentDataStr = req.headers.get('x-payment-data');
    let paymentData = {};
    
    if (paymentDataStr) {
      try {
        paymentData = JSON.parse(paymentDataStr);
      } catch (e) {
        console.error('Error parsing payment data:', e);
      }
    }

    // Create nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS,
      },
    });

    const amount = session.amount_total / 100;
    const currency = session.currency.toUpperCase();

    // Email to admin
    await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: process.env.USER_EMAIL,
      subject: 'New Payment Received',
      html: `
        <h2>Payment Confirmation</h2>
        <p><strong>Name:</strong> ${paymentData.name || 'N/A'}</p>
        <p><strong>Email:</strong> ${paymentData.email || 'N/A'}</p>
        <p><strong>Phone:</strong> ${paymentData.phone || 'N/A'}</p>
        <p><strong>Amount:</strong> ${amount} ${currency}</p>
        <p><strong>Status:</strong> Paid</p>
      `,
    });

    // Email to user
    if (paymentData.email) {
      await transporter.sendMail({
        from: process.env.USER_EMAIL,
        to: paymentData.email,
        subject: 'Payment Confirmation',
        html: `
          <h2>Thank you for your payment!</h2>
          <p>Dear ${paymentData.name},</p>
          <p>Your payment has been successfully processed.</p>
          <p><strong>Amount Paid:</strong> ${amount} ${currency}</p>
          <p><strong>Transaction ID:</strong> ${sessionId}</p>
          <p>If you have any questions, please contact us.</p>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json({ 
      success: false, 
      message: error.message 
    }, { status: 500 });
  }
}