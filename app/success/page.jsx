'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState('verifying');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyPayment = async () => {
      const sessionId = searchParams.get('session_id');
      
      if (!sessionId) {
        setStatus('error');
        setMessage('No session ID found');
        return;
      }

      try {
        const paymentData = sessionStorage.getItem('paymentData');
        // Verify session and send emails
        const response = await fetch('/api/verify-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-payment-data': paymentData || '{}',
          },
          body: JSON.stringify({ sessionId }),
        });

        const data = await response.json();

        if (data.success) {
          setStatus('success');
          setMessage('Payment successful! Confirmation emails have been sent.');
          // Clear sessionStorage
          sessionStorage.removeItem('paymentData');
        } else {
          setStatus('error');
          setMessage(data.message || 'Payment verification failed');
        }
      } catch (error) {
        setStatus('error');
        setMessage('Error verifying payment');
        console.error('Verification error:', error);
      }
    };

    verifyPayment();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#0b1c3d] to-[#1e3a8a] text-white p-4">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center">
        {status === 'verifying' && (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
            <h1 className="text-2xl font-bold text-white mb-2">Verifying Payment...</h1>
            <p className="text-white/70">Please wait while we confirm your payment</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Payment Successful!</h1>
            <p className="text-white/70 mb-6">{message}</p>
            
            <a href="/"
              className="inline-block px-6 py-3 bg-white text-slate-800 font-semibold rounded-lg hover:bg-white/90 transition-all"
            >
              Return to Home
            </a>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-16 h-16 bg-[#3d7ec7] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Verification Failed</h1>
            <p className="text-white/70 mb-6">{message}</p>
            
            <a href="/"
              className="inline-block px-6 py-3 bg-white text-slate-800 font-semibold rounded-lg hover:bg-white/90 transition-all"
            >
              Return to Home
            </a>
          </>
        )}
      </div>
    </div>
  );
}