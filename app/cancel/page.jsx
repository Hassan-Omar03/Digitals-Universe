'use client';

import { useEffect } from 'react';

export default function CancelPage() {
  useEffect(() => {
    // Clear sessionStorage when payment is cancelled
    sessionStorage.removeItem('paymentData');
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#0b1c3d] to-[#1e3a8a] text-whitep-4">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center">
        <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Payment Cancelled</h1>
        <p className="text-white/70 mb-6">
          Your payment was cancelled. No charges have been made.
        </p>

        <a href="/"
          className="inline-block px-6 py-3 bg-white text-slate-800 font-semibold rounded-lg hover:bg-white/90 transition-all"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
}