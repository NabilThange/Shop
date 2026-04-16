'use client';

import { useState, useTransition, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShoppingBag, ArrowLeft, CreditCard, Truck, Shield,
  CheckCircle2, Package, ChevronRight, Loader2, Tag,
  Smartphone, Lock, X, Zap, Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import { placeOrder, OrderFormData, PaymentMethod } from './actions';
import { cn } from '@/lib/utils';

// ─── Types ──────────────────────────────────────────────────────────────────

type CartItem = {
  id: string; quantity: number; variantTitle: string; price: number;
  total: number; productTitle: string; productHandle: string;
  imageUrl: string; imageAlt: string;
};
type CheckoutData = { items: CartItem[]; subtotal: number; tax: number; shipping: number; total: number; } | null;

// ─── Small helpers ───────────────────────────────────────────────────────────

function FormInput({ id, label, type = 'text', placeholder, value, onChange, required, disabled, className }: {
  id: string; label: string; type?: string; placeholder?: string;
  value: string; onChange: (v: string) => void; required?: boolean; disabled?: boolean; className?: string;
}) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={id} className="text-xs font-medium text-foreground/60 uppercase tracking-wider">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <input
        id={id} type={type} placeholder={placeholder} value={value}
        onChange={(e) => onChange(e.target.value)} required={required} disabled={disabled}
        className={cn(
          'w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground',
          'placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50',
          'transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed'
        )}
      />
    </div>
  );
}

function StepIndicator({ currentStep }: { currentStep: 1 | 2 | 3 }) {
  const steps = [{ num: 1, label: 'Shipping' }, { num: 2, label: 'Payment' }, { num: 3, label: 'Review' }];
  return (
    <div className="flex items-center">
      {steps.map((step, i) => (
        <div key={step.num} className="flex items-center">
          <div className="flex items-center gap-2">
            <div className={cn(
              'flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-all duration-300',
              step.num < currentStep ? 'bg-primary text-primary-foreground'
                : step.num === currentStep ? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
                : 'bg-muted text-muted-foreground'
            )}>
              {step.num < currentStep ? <Check className="size-3.5" /> : step.num}
            </div>
            <span className={cn('text-xs font-medium hidden sm:block', step.num === currentStep ? 'text-foreground' : 'text-muted-foreground')}>
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && <div className={cn('w-10 h-px mx-3', step.num < currentStep ? 'bg-primary' : 'bg-border')} />}
        </div>
      ))}
    </div>
  );
}

// ─── Mock Stripe Payment Modal ───────────────────────────────────────────────

type StripeStep = 'form' | 'authenticating' | 'processing' | 'done';

function StripeModal({
  total, onSuccess, onClose,
}: { total: number; onSuccess: () => void; onClose: () => void }) {
  const [stripeStep, setStripeStep] = useState<StripeStep>('form');
  const [cardNum, setCardNum] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');
  const [progress, setProgress] = useState(0);

  const formatCardNum = (v: string) => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  const formatExpiry = (v: string) => {
    const d = v.replace(/\D/g, '').slice(0, 4);
    return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    // Step 1: authenticating
    setStripeStep('authenticating');
    setProgress(0);
    let p = 0;
    const t1 = setInterval(() => { p += 4; setProgress(p); if (p >= 40) clearInterval(t1); }, 60);
    // Step 2: processing
    setTimeout(() => {
      setStripeStep('processing');
      let p2 = 40;
      const t2 = setInterval(() => { p2 += 3; setProgress(p2); if (p2 >= 90) clearInterval(t2); }, 50);
      // Step 3: done - stay for 10 seconds
      setTimeout(() => {
        setStripeStep('done');
        setProgress(100);
        setTimeout(() => onSuccess(), 10000); // Changed from 1200ms to 10000ms (10 seconds)
      }, 2100);
    }, 1800);
  };

  const cardBrand = cardNum.startsWith('4') ? 'visa'
    : cardNum.startsWith('5') ? 'mastercard'
    : cardNum.startsWith('3') ? 'amex' : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={stripeStep === 'form' ? onClose : undefined} />

      {/* Panel */}
      <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-neutral-900 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Stripe-like purple header */}
        <div className="bg-gradient-to-tr from-[#6772e5] to-[#9b8fe8] px-6 pt-6 pb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="text-white font-bold text-lg tracking-tight">stripe</div>
              <div className="text-white/60 text-xs">mock checkout</div>
            </div>
            {stripeStep === 'form' && (
              <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
                <X className="size-4" />
              </button>
            )}
          </div>
          <div className="text-white/70 text-xs mb-1">Total due</div>
          <div className="text-white text-3xl font-bold">{formatPrice(total, 'USD')}</div>

          {/* Progress bar (shown during processing) */}
          {stripeStep !== 'form' && (
            <div className="mt-4 h-1 rounded-full bg-white/20 overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          {stripeStep === 'form' && (
            <form onSubmit={handlePay} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1.5 block">Card Number</label>
                <div className="relative">
                  <input
                    value={cardNum}
                    onChange={(e) => setCardNum(formatCardNum(e.target.value))}
                    placeholder="1234 5678 9012 3456"
                    required
                    className="w-full rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-4 py-3 pr-14 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#6772e5]/50 transition"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                    {cardBrand === 'visa' && <span className="text-[10px] font-black text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded">VISA</span>}
                    {cardBrand === 'mastercard' && <span className="text-[10px] font-black text-red-700 bg-red-100 px-1.5 py-0.5 rounded">MC</span>}
                    {cardBrand === 'amex' && <span className="text-[10px] font-black text-green-700 bg-green-100 px-1.5 py-0.5 rounded">AMEX</span>}
                    {!cardBrand && <CreditCard className="size-4 text-neutral-400" />}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1.5 block">Expiry</label>
                  <input
                    value={expiry}
                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                    placeholder="MM/YY"
                    required
                    className="w-full rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-4 py-3 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#6772e5]/50 transition"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1.5 block">CVC</label>
                  <input
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    placeholder="123"
                    required
                    className="w-full rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-4 py-3 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#6772e5]/50 transition"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1.5 block">Name on Card</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="w-full rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-4 py-3 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#6772e5]/50 transition"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-[#6772e5] hover:bg-[#5469d4] text-white font-semibold py-3 text-sm transition-colors flex items-center justify-center gap-2"
              >
                <Lock className="size-3.5" />
                Pay {formatPrice(total, 'USD')}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-400">
                <Lock className="size-3" />
                <span>Secured by <strong>Stripe</strong> · Test mode</span>
              </div>
            </form>
          )}

          {stripeStep === 'authenticating' && (
            <div className="py-8 flex flex-col items-center gap-4 text-center">
              <div className="w-14 h-14 rounded-full border-4 border-[#6772e5]/20 border-t-[#6772e5] animate-spin" />
              <div>
                <p className="font-semibold text-sm">Authenticating your card…</p>
                <p className="text-xs text-neutral-500 mt-1">Verifying with your bank</p>
              </div>
            </div>
          )}

          {stripeStep === 'processing' && (
            <div className="py-8 flex flex-col items-center gap-4 text-center">
              <div className="relative w-14 h-14">
                <div className="absolute inset-0 rounded-full border-4 border-[#6772e5]/20 border-t-[#6772e5] animate-spin" />
                <div className="absolute inset-2 rounded-full bg-[#6772e5]/10 flex items-center justify-center">
                  <Zap className="size-4 text-[#6772e5]" />
                </div>
              </div>
              <div>
                <p className="font-semibold text-sm">Processing payment…</p>
                <p className="text-xs text-neutral-500 mt-1">Do not close this window</p>
              </div>
            </div>
          )}

          {stripeStep === 'done' && (
            <div className="py-8 flex flex-col items-center gap-4 text-center">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="size-8 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-sm text-green-700">Payment successful!</p>
                <p className="text-xs text-neutral-500 mt-1">Confirming your order…</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── GPay Mock ───────────────────────────────────────────────────────────────

function GPayModal({ total, onSuccess, onClose }: { total: number; onSuccess: () => void; onClose: () => void }) {
  const [phase, setPhase] = useState<'idle' | 'auth' | 'qr' | 'done'>('idle');
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    if (phase === 'qr') {
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setPhase('done');
            setTimeout(onSuccess, 2000);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [phase, onSuccess]);

  const handlePay = () => {
    setPhase('auth');
    setTimeout(() => { 
      setPhase('qr');
      setCountdown(60);
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={phase === 'idle' ? onClose : undefined} />
      <div className="relative w-full max-w-sm rounded-2xl bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <button className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700" onClick={phase === 'idle' ? onClose : undefined}>
          {phase === 'idle' && <X className="size-4" />}
        </button>

        {phase === 'idle' && (
          <div className="p-6 flex flex-col items-center gap-5">
            {/* GPay logo */}
            <div className="flex items-center gap-1 mt-2">
              <span className="text-2xl font-medium text-[#4285F4]">G</span>
              <span className="text-2xl font-medium text-[#EA4335]">o</span>
              <span className="text-2xl font-medium text-[#FBBC05]">o</span>
              <span className="text-2xl font-medium text-[#4285F4]">g</span>
              <span className="text-2xl font-medium text-[#34A853]">l</span>
              <span className="text-2xl font-medium text-[#EA4335]">e</span>
              <span className="ml-2 text-2xl font-medium text-neutral-800">Pay</span>
            </div>
            <p className="text-sm text-neutral-500 text-center">You'll pay securely with your Google account</p>
            <div className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 flex justify-between items-center">
              <span className="text-sm text-neutral-600">Total</span>
              <span className="text-sm font-bold">{formatPrice(total, 'USD')}</span>
            </div>
            <button
              onClick={handlePay}
              className="w-full rounded-full bg-black text-white font-medium py-3 text-sm hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
            >
              <Smartphone className="size-4" />
              Pay with Google Pay
            </button>
            <p className="text-[11px] text-neutral-400">Demo mode — no real charge will be made</p>
          </div>
        )}

        {phase === 'auth' && (
          <div className="p-10 flex flex-col items-center gap-5">
            <div className="w-12 h-12 rounded-full border-4 border-neutral-200 border-t-[#4285F4] animate-spin" />
            <div className="text-center">
              <p className="font-semibold text-sm">Authenticating…</p>
              <p className="text-xs text-neutral-500 mt-1">Confirming with Google Pay</p>
            </div>
          </div>
        )}

        {phase === 'qr' && (
          <div className="p-6 flex flex-col items-center gap-5">
            <div className="flex items-center gap-1 mt-2">
              <span className="text-2xl font-medium text-[#4285F4]">G</span>
              <span className="text-2xl font-medium text-[#EA4335]">o</span>
              <span className="text-2xl font-medium text-[#FBBC05]">o</span>
              <span className="text-2xl font-medium text-[#4285F4]">g</span>
              <span className="text-2xl font-medium text-[#34A853]">l</span>
              <span className="text-2xl font-medium text-[#EA4335]">e</span>
              <span className="ml-2 text-2xl font-medium text-neutral-800">Pay</span>
            </div>
            <p className="text-sm text-neutral-600 text-center font-medium">Scan QR Code to Complete Payment</p>
            <div className="relative w-64 h-64 rounded-xl overflow-hidden border-2 border-neutral-200 bg-white">
              <Image 
                src="/qr-code.png" 
                alt="Google Pay QR Code" 
                fill 
                className="object-contain p-2"
                priority
              />
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="text-3xl font-bold text-[#4285F4]">{countdown}s</div>
              <p className="text-xs text-neutral-500">Time remaining to scan</p>
            </div>
            <div className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 flex justify-between items-center">
              <span className="text-sm text-neutral-600">Total</span>
              <span className="text-sm font-bold">{formatPrice(total, 'USD')}</span>
            </div>
          </div>
        )}

        {phase === 'done' && (
          <div className="p-10 flex flex-col items-center gap-5">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="size-7 text-green-600" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-sm text-green-700">Approved!</p>
              <p className="text-xs text-neutral-500 mt-1">Finalising your order…</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Order Success ────────────────────────────────────────────────────────────

function OrderSuccess({ orderId, total, paymentMethod, router }: {
  orderId: string; total: number; paymentMethod: PaymentMethod; router: ReturnType<typeof useRouter>;
}) {
  const methodLabel: Record<PaymentMethod, string> = {
    cod: 'Cash on Delivery', card: 'Credit / Debit Card', gpay: 'Google Pay', stripe: 'Stripe',
  };

  // Auto-redirect to shop after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/shop');
    }, 10000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6 py-16 text-center px-4">
      <div className="relative">
        <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center">
          <CheckCircle2 className="size-12 text-emerald-600" />
        </div>
      </div>
      <div className="space-y-2 max-w-sm">
        <h1 className="text-3xl font-bold tracking-tight">Order Placed! 🎉</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Thank you for shopping with TechWiser. Your order is confirmed and will be processed shortly.
        </p>
        <p className="text-xs text-muted-foreground">
          Redirecting to shop in 10 seconds...
        </p>
      </div>

      {/* Receipt card */}
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card overflow-hidden text-left">
        <div className="px-5 py-3.5 bg-muted/60 border-b border-border">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Order Receipt</p>
        </div>
        <div className="px-5 py-4 space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Order ID</span>
            <span className="font-mono font-bold text-xs">{orderId}</span>
          </div>
          {total > 0 && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Charged</span>
              <span className="font-semibold">{formatPrice(total, 'USD')}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-muted-foreground">Payment</span>
            <span>{methodLabel[paymentMethod]}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Status</span>
            <span className="text-emerald-600 font-semibold flex items-center gap-1">
              <Check className="size-3.5" /> Confirmed
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-2">
        <Button size="lg" onClick={() => router.push('/shop')}>Continue Shopping</Button>
        <Button size="lg" variant="outline" onClick={() => router.push('/')}>Go Home</Button>
      </div>
      <div className="flex items-center gap-6 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5"><Truck className="size-3.5" /><span>3–5 business days</span></div>
        <div className="flex items-center gap-1.5"><Shield className="size-3.5" /><span>30-day returns</span></div>
      </div>
    </div>
  );
}

// ─── Main Client ─────────────────────────────────────────────────────────────

export function CheckoutClient({ cartData }: { cartData: CheckoutData }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [orderTotal, setOrderTotal] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [showStripeModal, setShowStripeModal] = useState(false);
  const [showGPayModal, setShowGPayModal] = useState(false);

  // Shipping
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('US');

  // Card (manual)
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [cardName, setCardName] = useState('');

  const formatCardNum = (v: string) => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  const formatExpiry = (v: string) => {
    const d = v.replace(/\D/g, '').slice(0, 4);
    return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  // Check for order success FIRST before checking cart
  if (orderId) {
    return <OrderSuccess orderId={orderId} total={orderTotal} paymentMethod={paymentMethod} router={router} />;
  }

  if (!cartData || cartData.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6 py-16 text-center">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
          <ShoppingBag className="size-9 text-muted-foreground" />
        </div>
        <div className="space-y-2"><h2 className="text-2xl font-bold">Your cart is empty</h2>
          <p className="text-muted-foreground text-sm">Add some items before checking out.</p>
        </div>
        <Button size="lg" asChild><Link href="/shop">Start Shopping</Link></Button>
      </div>
    );
  }

  const { items, subtotal, tax, shipping, total } = cartData;

  const doPlaceOrder = (method: PaymentMethod = paymentMethod) => {
    setError(null);
    startTransition(async () => {
      const data: OrderFormData = {
        firstName, lastName, email, phone, address, city, state, zipCode, country,
        paymentMethod: method, cardNumber, cardExpiry, cardCvc, cardName,
      };
      const result = await placeOrder(data);
      if (result.success) {
        setOrderId(result.orderId);
        setOrderTotal(result.total);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setError(result.error);
      }
    });
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePaymentNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinalOrder = () => {
    if (paymentMethod === 'stripe') { setShowStripeModal(true); return; }
    if (paymentMethod === 'gpay') { setShowGPayModal(true); return; }
    doPlaceOrder();
  };

  const paymentOptions: { value: PaymentMethod; label: string; desc: string; icon: React.ElementType; color?: string }[] = [
    { value: 'cod', label: 'Cash on Delivery', desc: 'Pay when your order arrives', icon: Truck },
    { value: 'card', label: 'Credit / Debit Card', desc: 'Visa, Mastercard, Amex', icon: CreditCard },
    { value: 'gpay', label: 'Google Pay', desc: 'Fast & secure with Google', icon: Smartphone },
    { value: 'stripe', label: 'Stripe', desc: 'Powered by Stripe checkout', icon: Zap },
  ];

  return (
    <>
      {/* Stripe modal */}
      {showStripeModal && (
        <StripeModal
          total={total}
          onClose={() => setShowStripeModal(false)}
          onSuccess={() => { setShowStripeModal(false); doPlaceOrder('stripe'); }}
        />
      )}

      {/* GPay modal */}
      {showGPayModal && (
        <GPayModal
          total={total}
          onClose={() => setShowGPayModal(false)}
          onSuccess={() => { setShowGPayModal(false); doPlaceOrder('gpay'); }}
        />
      )}

      <div className="min-h-screen bg-background">
        {/* Sticky header */}
        <div className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-sm">
          <div className="mx-auto max-w-6xl px-sides py-3 flex items-center justify-between gap-4">
            <Link href="/shop" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="size-4" /><span className="hidden sm:inline">Back to shop</span>
            </Link>
            <StepIndicator currentStep={step} />
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Shield className="size-3.5" /><span className="hidden sm:inline">Secured</span>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-sides py-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">

            {/* ── LEFT: Form ── */}
            <div className="space-y-6">

              {/* STEP 1 – Shipping */}
              {step === 1 && (
                <form onSubmit={handleShippingSubmit} className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold mb-0.5">Shipping Information</h2>
                    <p className="text-sm text-muted-foreground">Tell us where to deliver your order.</p>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-5 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormInput id="firstName" label="First Name" placeholder="John" value={firstName} onChange={setFirstName} required />
                      <FormInput id="lastName" label="Last Name" placeholder="Doe" value={lastName} onChange={setLastName} required />
                    </div>
                    <FormInput id="email" label="Email" type="email" placeholder="john@example.com" value={email} onChange={setEmail} required />
                    <FormInput id="phone" label="Phone" type="tel" placeholder="+1 555 000 0000" value={phone} onChange={setPhone} />
                    <FormInput id="address" label="Street Address" placeholder="123 Main Street" value={address} onChange={setAddress} required />
                    <div className="grid grid-cols-2 gap-4">
                      <FormInput id="city" label="City" placeholder="New York" value={city} onChange={setCity} required />
                      <FormInput id="state" label="State / Province" placeholder="NY" value={state} onChange={setState} required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <FormInput id="zipCode" label="ZIP / Postal Code" placeholder="10001" value={zipCode} onChange={setZipCode} required />
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="country" className="text-xs font-medium text-foreground/60 uppercase tracking-wider">Country <span className="text-destructive">*</span></label>
                        <select id="country" value={country} onChange={e => setCountry(e.target.value)} required
                          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all duration-150">
                          <option value="US">United States</option>
                          <option value="IN">India</option>
                          <option value="GB">United Kingdom</option>
                          <option value="CA">Canada</option>
                          <option value="AU">Australia</option>
                          <option value="DE">Germany</option>
                          <option value="FR">France</option>
                          <option value="JP">Japan</option>
                          <option value="SG">Singapore</option>
                          <option value="AE">UAE</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <Button type="submit" size="lg" className="w-full flex items-center gap-2">
                    Continue to Payment <ChevronRight className="size-4" />
                  </Button>
                </form>
              )}

              {/* STEP 2 – Payment */}
              {step === 2 && (
                <form onSubmit={handlePaymentNext} className="space-y-5">
                  <div className="flex items-center gap-3">
                    <button type="button" onClick={() => setStep(1)} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                      <ArrowLeft className="size-4" /> Back
                    </button>
                    <div>
                      <h2 className="text-xl font-bold">Payment Method</h2>
                      <p className="text-sm text-muted-foreground">Choose how you'd like to pay.</p>
                    </div>
                  </div>

                  {/* Method grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {paymentOptions.map((opt) => (
                      <button key={opt.value} type="button" onClick={() => setPaymentMethod(opt.value)}
                        className={cn(
                          'flex flex-col items-start gap-2 rounded-xl border-2 p-4 text-left transition-all duration-150',
                          paymentMethod === opt.value
                            ? 'border-primary bg-primary/5 shadow-sm'
                            : 'border-border hover:border-border/70 hover:bg-muted/40'
                        )}>
                        <div className="flex items-center justify-between w-full">
                          <opt.icon className={cn('size-5', paymentMethod === opt.value ? 'text-primary' : 'text-muted-foreground')} />
                          <div className={cn('w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all', paymentMethod === opt.value ? 'border-primary' : 'border-border')}>
                            {paymentMethod === opt.value && <div className="w-2 h-2 rounded-full bg-primary" />}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{opt.label}</p>
                          <p className="text-xs text-muted-foreground">{opt.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Inline card form if card selected */}
                  {paymentMethod === 'card' && (
                    <div className="rounded-xl border border-border bg-card p-5 space-y-4">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Card Details</p>
                      <div className="relative">
                        <FormInput id="cardNumber" label="Card Number" placeholder="1234 5678 9012 3456"
                          value={cardNumber} onChange={(v) => setCardNumber(formatCardNum(v))} required />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <FormInput id="cardExpiry" label="Expiry (MM/YY)" placeholder="08/27"
                          value={cardExpiry} onChange={(v) => setCardExpiry(formatExpiry(v))} required />
                        <FormInput id="cardCvc" label="CVC" placeholder="123"
                          value={cardCvc} onChange={(v) => setCardCvc(v.replace(/\D/g, '').slice(0, 4))} required />
                      </div>
                      <FormInput id="cardName" label="Name on Card" placeholder="John Doe"
                        value={cardName} onChange={setCardName} required />
                      <div className="flex items-center gap-2 text-xs text-muted-foreground rounded-lg border border-border bg-muted/50 px-3 py-2">
                        <Shield className="size-3.5 shrink-0" />
                        <span>256-bit SSL encrypted. We never store your card details.</span>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'cod' && (
                    <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/50 p-4">
                      <Truck className="size-5 text-muted-foreground mt-0.5 shrink-0" />
                      <div className="text-sm">
                        <p className="font-medium">Cash on Delivery</p>
                        <p className="text-muted-foreground text-xs mt-0.5">Pay in cash when your package arrives. No online payment needed.</p>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'gpay' && (
                    <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/50 p-4">
                      <Smartphone className="size-5 text-muted-foreground mt-0.5 shrink-0" />
                      <div className="text-sm">
                        <p className="font-medium">Google Pay</p>
                        <p className="text-muted-foreground text-xs mt-0.5">You'll be prompted to authenticate with your Google account on the next step.</p>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'stripe' && (
                    <div className="flex items-start gap-3 rounded-xl border border-[#6772e5]/40 bg-[#6772e5]/5 p-4">
                      <Zap className="size-5 text-[#6772e5] mt-0.5 shrink-0" />
                      <div className="text-sm">
                        <p className="font-medium">Stripe Checkout</p>
                        <p className="text-muted-foreground text-xs mt-0.5">A secure mock Stripe payment form will open. Enter any card details to test.</p>
                      </div>
                    </div>
                  )}

                  <Button type="submit" size="lg" className="w-full flex items-center gap-2">
                    Review Order <ChevronRight className="size-4" />
                  </Button>
                </form>
              )}

              {/* STEP 3 – Review */}
              {step === 3 && (
                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <button type="button" onClick={() => setStep(2)} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                      <ArrowLeft className="size-4" /> Back
                    </button>
                    <div>
                      <h2 className="text-xl font-bold">Review Your Order</h2>
                      <p className="text-sm text-muted-foreground">Confirm everything is correct before placing.</p>
                    </div>
                  </div>

                  {/* Shipping recap */}
                  <div className="rounded-xl border border-border bg-card p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold flex items-center gap-2"><Truck className="size-4 text-muted-foreground" /> Delivery</h3>
                      <button onClick={() => setStep(1)} className="text-xs text-primary hover:underline">Edit</button>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-0.5">
                      <p className="text-foreground font-medium">{firstName} {lastName}</p>
                      <p>{address}</p>
                      <p>{city}{state ? `, ${state}` : ''} {zipCode}</p>
                      <p>{country}</p>
                      {email && <p className="mt-1 text-xs">{email}</p>}
                    </div>
                  </div>

                  {/* Payment recap */}
                  <div className="rounded-xl border border-border bg-card p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold flex items-center gap-2"><CreditCard className="size-4 text-muted-foreground" /> Payment</h3>
                      <button onClick={() => setStep(2)} className="text-xs text-primary hover:underline">Edit</button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {paymentMethod === 'cod' && 'Cash on Delivery'}
                      {paymentMethod === 'card' && `Card ending in ${cardNumber.slice(-4) || '****'}`}
                      {paymentMethod === 'gpay' && 'Google Pay'}
                      {paymentMethod === 'stripe' && 'Stripe (mock)'}
                    </p>
                  </div>

                  {error && (
                    <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>
                  )}

                  <Button
                    size="lg"
                    className={cn('w-full flex items-center gap-2', paymentMethod === 'stripe' && 'bg-[#6772e5] hover:bg-[#5469d4]')}
                    onClick={handleFinalOrder}
                    disabled={isPending}
                    id="place-order-btn"
                  >
                    {isPending ? (
                      <><Loader2 className="size-4 animate-spin" /> Processing…</>
                    ) : paymentMethod === 'stripe' ? (
                      <><Lock className="size-4" /> Pay with Stripe · {formatPrice(total, 'USD')}</>
                    ) : paymentMethod === 'gpay' ? (
                      <><Smartphone className="size-4" /> Pay with Google Pay · {formatPrice(total, 'USD')}</>
                    ) : (
                      <>Place Order · {formatPrice(total, 'USD')} <ChevronRight className="size-4" /></>
                    )}
                  </Button>

                  <p className="text-center text-xs text-muted-foreground">
                    By placing your order, you agree to our{' '}
                    <span className="underline cursor-pointer hover:text-foreground">Terms</span> and{' '}
                    <span className="underline cursor-pointer hover:text-foreground">Privacy Policy</span>.
                  </p>
                </div>
              )}
            </div>

            {/* ── RIGHT: Order Summary ── */}
            <div className="lg:sticky lg:top-24 space-y-4">
              <div className="rounded-xl border border-border bg-card overflow-hidden">
                <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                  <h3 className="font-semibold text-sm">Order Summary</h3>
                  <span className="text-xs text-muted-foreground bg-muted rounded-full px-2 py-0.5">{items.length} {items.length === 1 ? 'item' : 'items'}</span>
                </div>

                <div className="divide-y divide-border">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3.5 px-5 py-4">
                      <div className="relative size-16 shrink-0 rounded-lg overflow-hidden border border-border bg-muted">
                        {item.imageUrl
                          ? <Image src={item.imageUrl} alt={item.imageAlt} fill className="object-cover" sizes="64px" />
                          : <div className="size-full flex items-center justify-center"><ShoppingBag className="size-5 text-muted-foreground" /></div>
                        }
                        <div className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center px-1">
                          {item.quantity}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.productTitle}</p>
                        {item.variantTitle && item.variantTitle !== 'Default Title' && (
                          <p className="text-xs text-muted-foreground">{item.variantTitle}</p>
                        )}
                      </div>
                      <p className="text-sm font-semibold shrink-0">{formatPrice(item.total, 'USD')}</p>
                    </div>
                  ))}
                </div>

                <div className="px-5 py-4 border-t border-border space-y-2.5">
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(subtotal, 'USD')}</span></div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className={shipping === 0 ? 'text-emerald-600 font-medium' : ''}>{shipping === 0 ? 'Free' : formatPrice(shipping, 'USD')}</span>
                  </div>
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground">Tax (8%)</span><span>{formatPrice(tax, 'USD')}</span></div>
                  <div className="flex justify-between text-base font-bold pt-2 border-t border-border">
                    <span>Total</span><span>{formatPrice(total, 'USD')}</span>
                  </div>
                </div>

                {shipping > 0 && (
                  <div className="px-5 pb-4">
                    <div className="flex items-center gap-2 rounded-lg bg-muted/70 px-3 py-2">
                      <Tag className="size-3.5 text-muted-foreground shrink-0" />
                      <p className="text-xs text-muted-foreground">Add <strong>{formatPrice(50 - subtotal, 'USD')}</strong> more for free shipping</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="rounded-xl border border-border bg-card p-4 space-y-3">
                {[
                  { icon: Shield, text: 'SSL encrypted & secure checkout' },
                  { icon: Truck, text: 'Free shipping on orders over $50' },
                  { icon: Package, text: 'Easy 30-day returns & exchanges' },
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs text-muted-foreground">
                    <b.icon className="size-4 shrink-0" /><span>{b.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
