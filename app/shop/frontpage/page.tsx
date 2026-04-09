import { Metadata } from 'next';
import { Suspense } from 'react';
import ProductList from '../components/product-list';
import ResultsControls from '../components/results-controls';
import { ProductGrid } from '../components/product-grid';
import { ProductCardSkeleton } from '../components/product-card-skeleton';
import { storeCatalog } from '@/lib/shopify/constants';

export const metadata: Metadata = {
  title: 'ACME Store | Featured Products',
  description: 'Discover our featured and newest products.',
};

export const revalidate = 60;

export default async function FrontPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  
  // Force newest sort for featured page
  const featuredSearchParams = {
    ...searchParams,
    sort: 'newest',
  };

  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Featured Products</h1>
        <p className="text-muted-foreground mt-2">Check out our newest arrivals</p>
      </div>
      
      <Suspense
        fallback={
          <>
            <ResultsControls className="max-md:hidden" collections={[]} products={[]} />
            <ProductGrid>
              {Array.from({ length: 12 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </ProductGrid>
          </>
        }
      >
        <ProductList 
          collection={storeCatalog.rootCategoryId} 
          searchParams={featuredSearchParams} 
        />
      </Suspense>
    </>
  );
}
