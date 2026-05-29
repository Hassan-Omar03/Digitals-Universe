'use client';

import { useState } from 'react';
import { motion } from '@/components/StaticMotion';
import { CreditCard, Lock, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface PaymentFormProps {
  amount: number;
  serviceName: string;
}

export default function PaymentForm({ amount, serviceName }: PaymentFormProps) {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: 'Payment Successful!',
      description: `Your payment of $${amount} for ${serviceName} has been processed.`,
    });

    setPaymentData({
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvv: '',
    });
    setIsProcessing(false);
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\s/g, '');
    value = value.replace(/(\d{4})/g, '$1 ').trim();
    if (value.length <= 19) {
      setPaymentData(prev => ({ ...prev, cardNumber: value }));
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    if (value.length <= 5) {
      setPaymentData(prev => ({ ...prev, expiryDate: value }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto relative z-10"
    >
      <Card className="border border-white/10 bg-neutral-900/50 backdrop-blur-xl shadow-2xl">
        <CardHeader className="border-b border-white/10 bg-black/40">
          <CardTitle className="flex items-center justify-between text-white">
            <span>Secure Payment</span>
            <Lock className="h-5 w-5 text-[#3d7ec7]" />
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="mb-6 p-4 bg-white/5 border border-white/10 rounded-xl">
            <div className="flex justify-between items-center mb-2">
              <span className="text-neutral-400">Service:</span>
              <span className="font-semibold text-white">{serviceName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-400">Amount:</span>
              <span className="text-2xl font-bold text-[#3d7ec7]">${amount}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="cardName" className="text-neutral-300">Cardholder Name</Label>
              <Input
                id="cardName"
                value={paymentData.cardName}
                onChange={(e) => setPaymentData(prev => ({ ...prev, cardName: e.target.value }))}
                placeholder="John Doe"
                required
                className="mt-2 bg-black/50 border-white/10 text-white placeholder:text-neutral-600 focus-visible:ring-[#3d7ec7]"
              />
            </div>

            <div>
              <Label htmlFor="cardNumber" className="text-neutral-300">Card Number</Label>
              <div className="relative mt-2">
                <Input
                  id="cardNumber"
                  value={paymentData.cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="1234 5678 9012 3456"
                  required
                  className="pl-10 bg-black/50 border-white/10 text-white placeholder:text-neutral-600 focus-visible:ring-[#3d7ec7]"
                />
                <CreditCard className="absolute left-3 top-3 h-5 w-5 text-neutral-500" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiryDate" className="text-neutral-300">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  value={paymentData.expiryDate}
                  onChange={handleExpiryChange}
                  placeholder="MM/YY"
                  required
                  className="mt-2 bg-black/50 border-white/10 text-white placeholder:text-neutral-600 focus-visible:ring-[#3d7ec7]"
                />
              </div>
              <div>
                <Label htmlFor="cvv" className="text-neutral-300">CVV</Label>
                <Input
                  id="cvv"
                  type="password"
                  maxLength={4}
                  value={paymentData.cvv}
                  onChange={(e) => setPaymentData(prev => ({ ...prev, cvv: e.target.value.replace(/\D/g, '') }))}
                  placeholder="123"
                  required
                  className="mt-2 bg-black/50 border-white/10 text-white placeholder:text-neutral-600 focus-visible:ring-[#3d7ec7]"
                />
              </div>
            </div>

            <div className="flex items-start space-x-2 text-sm text-neutral-400 bg-white/5 border border-white/5 p-3 rounded">
              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Your payment information is encrypted and secure. We never store your card details.</span>
            </div>

            <Button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-[#3d7ec7] hover:bg-[#5a9de0] text-white text-lg py-6 shadow-[0_0_20px_rgba(61,126,199,0.3)] transition-all font-bold"
            >
              {isProcessing ? 'Processing...' : `Pay $${amount}`}
            </Button>
          </form>

          <div className="mt-6 flex justify-center space-x-4 opacity-50">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-8" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-8" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg" alt="Amex" className="h-8" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
