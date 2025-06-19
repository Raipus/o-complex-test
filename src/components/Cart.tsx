import React, { FormEvent } from "react";
import { Product } from "@/services/api/store";
import CartItem from "./CartItem";

export type CartActions = {
  addToCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  handlePhoneChange: (value: string) => void;
  validatePhone: () => boolean;
};

interface CartProps {
  cartItems: (Product & { quantity: number })[];
  totalPrice: number;
  phone: string;
  phoneError: boolean;
  isSubmitting: boolean;
  onSubmit: (e: FormEvent) => void;
  cartActions: CartActions;
}

export default function Cart({
  cartItems,
  totalPrice,
  phone,
  phoneError,
  isSubmitting,
  onSubmit,
  cartActions,
}: CartProps) {
  return (
    <div className="bg-[#D9D9D9] p-6 rounded-2xl mb-6 mt-40 shadow-md text-black text-2xl max-w-4xl lg:min-w-4xl overflow-hidden">
      <h2 className="text-4xl mb-4 text-center lg:text-left">
        Добавленные товары
      </h2>

      {cartItems.length > 0 ? (
        <>
          <div className="mb-6">
            <div className="grid grid-cols-12 gap-2 pb-2">
              <div className="lg:col-span-6 col-span-3">Товар</div>
              <div className="lg:col-span-2 col-span-6 text-center">
                Количество
              </div>
              <div className="lg:col-span-4 col-span-2 text-right">Сумма</div>
            </div>

            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                product={item}
                onUpdateQuantity={cartActions.updateQuantity}
              />
            ))}

            <div className="grid grid-cols-12 gap-2 pt-3">
              <div className="col-span-9 text-right">Итого:</div>
              <div className="col-span-3 text-right">
                {totalPrice.toLocaleString()}₽
              </div>
            </div>
          </div>

          <form onSubmit={onSubmit} className="grid grid-cols-12 gap-2">
            <div
              className={`${phoneError ? "text-red-500" : "text-white"} bg-[#222222] rounded-2xl text-4xl lg:col-span-6 col-span-12`}
            >
              <input
                type="text"
                value={phone}
                onChange={(e) => cartActions.handlePhoneChange(e.target.value)}
                placeholder="+7 (___) ___-__-__"
                className={`w-full p-3 border rounded-2xl text-center ${
                  phoneError ? "border-red-500" : ""
                }`}
              />
              {phoneError && (
                <p className="text-red-500 text-sm p-3 text-center">
                  Пожалуйста, введите полный номер телефона
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#222222] text-white py-3 disabled:opacity-50 transition p-4 rounded-2xl text-4xl lg:col-span-6 col-span-12 hover:scale-105 duration-300"
            >
              {isSubmitting ? "Оформляем заказ..." : "Заказать"}
            </button>
          </form>
        </>
      ) : (
        <div className="text-center py-6">
          <p className="text-gray-500">Ваша корзина пуста</p>
          <p className="text-gray-400">Добавьте товары из списка ниже</p>
        </div>
      )}
    </div>
  );
}
