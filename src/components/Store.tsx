"use client";

import React, { useState, FormEvent } from "react";
import { StoreService } from "@/services/api/store";
import useProducts from "@/hooks/useProducts";
import useCart from "@/hooks/useCart";
import Cart from "./Cart";
import ProductList from "./ProductList";
import SuccessPopup from "./SuccessPopup";
import { Product } from "@/services/api/store";
import { CartActions } from "./Cart";

interface OrderResponse {
  success: number;
  error?: string;
}

export default function Store() {
  const {
    products,
    loading: productsLoading,
    error: productsError,
    hasMore,
    loadMore,
  } = useProducts();

  const {
    cart,
    phone,
    phoneError,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    handlePhoneChange,
    validatePhone,
  } = useCart();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Подготовка данных для корзины
  const cartItems = Object.entries(cart)
    .map(([id, quantity]) => {
      const product = products.find((p) => p.id === parseInt(id));
      return product ? { ...product, quantity } : null;
    })
    .filter(Boolean) as (Product & { quantity: number })[];

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Отправка заказа
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validatePhone()) return;

    const cartItemsData = Object.entries(cart)
      .filter(([_, qty]) => qty > 0)
      .map(([id, quantity]) => ({
        id: parseInt(id),
        quantity,
      }));

    if (cartItemsData.length === 0) {
      alert("Добавьте товары в корзину");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await StoreService.createOrder({
        phone: phone.replace(/\D/g, ""),
        cart: cartItemsData,
      });

      if (response.success === 1) {
        setShowSuccess(true);
        clearCart();
      } else {
        alert(`Ошибка: ${response.error || "Неизвестная ошибка"}`);
      }
    } catch (error) {
      console.error("Order error:", error);
      alert("Произошла ошибка при оформлении заказа");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Действия корзины для передачи в дочерние компоненты
  const cartActions: CartActions = {
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    handlePhoneChange,
    validatePhone,
  };

  return (
    <div className="items-center justify-items-center">
      <Cart
        cartItems={cartItems}
        totalPrice={totalPrice}
        phone={phone}
        phoneError={phoneError}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
        cartActions={cartActions}
      />

      <ProductList
        products={products}
        loading={productsLoading}
        hasMore={hasMore}
        error={productsError}
        cart={cart}
        cartActions={cartActions}
        loadMore={loadMore}
      />

      {showSuccess && <SuccessPopup onClose={() => setShowSuccess(false)} />}
    </div>
  );
}
