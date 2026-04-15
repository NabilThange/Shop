import { Metadata } from 'next';
import { getCheckoutCart } from './actions';
import { CheckoutClient } from './checkout-client';

export const metadata: Metadata = {
  title: 'Checkout — TechWiser Shop',
  description: 'Complete your purchase securely at TechWiser Shop.',
};

export default async function CheckoutPage() {
  const cartData = await getCheckoutCart();

  return <CheckoutClient cartData={cartData} />;
}
