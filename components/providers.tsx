'use client';

import { ReactNode } from 'react';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { CartProvider } from '@/components/cart/cart-context';
import { V0Provider } from '@/lib/context';
import dynamic from 'next/dynamic';

const V0Setup = dynamic(() => import('@/components/v0-setup'));

type ProvidersProps = {
  children: ReactNode;
  isV0: boolean;
};

export function Providers({ children, isV0 }: ProvidersProps) {
  return (
    <V0Provider isV0={isV0}>
      <CartProvider>
        <NuqsAdapter>
          {children}
        </NuqsAdapter>
      </CartProvider>
      {isV0 && <V0Setup />}
    </V0Provider>
  );
}
