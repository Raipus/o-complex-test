"use client";

import { useState, useEffect, useCallback } from "react";
import { StoreService, Product } from "@/services/api/store";

export default function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = useCallback(
    async (pageNum: number) => {
      if (!hasMore || loading) return;

      setLoading(true);
      setError(null);

      try {
        const response = await StoreService.getProducts(pageNum, 6);

        setProducts((prev) => {
          const existingIds = new Set(prev.map((p) => p.id));
          const newItems = response.items.filter(
            (item) => !existingIds.has(item.id)
          );
          return [...prev, ...newItems];
        });

        setPage(pageNum + 1);
        setHasMore(products.length + response.items.length < response.total);
      } catch (err) {
        setError("Ошибка при загрузке товаров");
        console.error("Ошибка при загрузке товаров:", err);
      } finally {
        setLoading(false);
      }
    },
    [hasMore, loading, products.length]
  );

  useEffect(() => {
    loadProducts(1);
  }, []);

  return {
    products,
    loading,
    error,
    hasMore,
    loadMore: () => loadProducts(page),
  };
}
