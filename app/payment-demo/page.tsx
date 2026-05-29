'use client';

import { motion } from '@/components/StaticMotion';
import PaymentForm from '@/components/PaymentForm';
import { Toaster } from '@/components/ui/toaster';

export default function PaymentDemoPage() {
  return (
    <div className="min-h-screen pt-20 bg-black">
      <Toaster />
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Payment <span className="text-[#3d7ec7]">Demo</span>
            </h1>
            <p className="text-lg text-neutral-400 max-w-3xl mx-auto leading-relaxed mb-8">
              Secure payment processing for all our services
            </p>
            <p className="text-sm text-neutral-500 max-w-2xl mx-auto">
              This is a demo payment form. No actual charges will be made. Use test card number: 4242 4242 4242 4242
            </p>
          </motion.div>

          <PaymentForm amount={5000} serviceName="Custom Website Development" />
        </div>
      </section>
    </div>
  );
}
