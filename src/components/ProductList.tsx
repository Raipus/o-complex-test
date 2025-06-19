"use client";

import React, { useRef, useEffect } from "react";
import { Product } from "@/services/api/store";
import ProductCard from "./ProductCard";
import { CartActions } from "./Cart";

interface ProductListProps {
  products: Product[];
  loading: boolean;
  hasMore: boolean;
  error: string | null;
  cart: Record<number, number>;
  cartActions: CartActions;
  loadMore: () => void;
}

export default function ProductList({
  products,
  loading,
  hasMore,
  error,
  cart,
  cartActions,
  loadMore,
}: ProductListProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(sentinelRef.current);

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [loading, hasMore, loadMore]);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12 mb-8 max-w-4xl lg:min-w-4xl">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            cart={cart}
            onCartAdd={cartActions.addToCart}
            onCartUpdate={cartActions.updateQuantity}
          />
        ))}
      </div>

      <div ref={sentinelRef} className="h-10 flex items-center justify-center">
        {loading && <div className="text-center py-4">Загружаем товары...</div>}
        {error && <div className="text-center py-4 text-red-500">{error}</div>}
        {!hasMore && !error && (
          <div className="text-center py-4">Все товары загружены</div>
        )}
      </div>
    </>
  );
}
