"use client";

import { useState, useEffect } from "react";

export default function useCart() {
  const [cart, setCart] = useState<Record<number, number>>({});
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);

  // Восстановление корзины из localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    const savedPhone = localStorage.getItem("phone");

    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedPhone) setPhone(savedPhone);
  }, []);

  // Сохранение корзины в localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("phone", phone);
  }, [phone]);

  const addToCart = (id: number) => {
    setCart((prev) => ({ ...prev, [id]: 1 }));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id);
    } else {
      setCart((prev) => ({ ...prev, [id]: quantity }));
    }
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });
  };

  const clearCart = () => {
    setCart({});
    localStorage.removeItem("cart");
  };

  // Форматирование телефона
  const formatPhone = (input: string) => {
    const digits = input.replace(/\D/g, "").substring(0, 11);
    let formatted = "";

    if (digits.length > 0) formatted = "+7 ";
    if (digits.length > 1) formatted += `(${digits.substring(1, 4)}`;
    if (digits.length > 4) formatted += `) ${digits.substring(4, 7)}`;
    if (digits.length > 7) formatted += `-${digits.substring(7, 9)}`;
    if (digits.length > 9) formatted += `-${digits.substring(9, 11)}`;

    return formatted;
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhone(value);
    setPhone(formatted);
    setPhoneError(false);
  };

  const validatePhone = () => {
    const phoneDigits = phone.replace(/\D/g, "");
    const isValid = phoneDigits.length === 11;
    setPhoneError(!isValid);
    return isValid;
  };

  return {
    cart,
    phone,
    phoneError,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    handlePhoneChange,
    validatePhone,
    setPhoneError,
  };
}
