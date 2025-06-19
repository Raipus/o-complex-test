import React from "react";
import { Product } from "@/services/api/store";
import { CartActions } from "@/components/Cart";

interface CartItemProps {
  product: Product & { quantity: number };
  onUpdateQuantity: CartActions["updateQuantity"];
}

export default function CartItem({ product, onUpdateQuantity }: CartItemProps) {
  return (
    <div className="grid grid-cols-12 gap-2 py-3 text-2xl">
      <div className="lg:col-span-6 col-span-4">
        <h3 className="font-medium break-words">{product.title}</h3>
        <p className="text-sm text-gray-600">
          {product.price.toLocaleString()}₽ × {product.quantity}
        </p>
      </div>
      <div className="lg:col-span-2 col-span-4 flex items-center justify-center">
        <div className="flex">
          <button
            className="px-2 py-1 bg-gray-100 hover:bg-gray-300"
            onClick={() => onUpdateQuantity(product.id, product.quantity - 1)}
          >
            -
          </button>
          <div className="px-2 py-1 w-10 text-center">{product.quantity}</div>
          <button
            className="px-2 py-1 bg-gray-100 hover:bg-gray-300"
            onClick={() => onUpdateQuantity(product.id, product.quantity + 1)}
          >
            +
          </button>
        </div>
      </div>
      <div className="lg:col-span-4 col-span-4 text-right font-medium content-center">
        {(product.price * product.quantity).toLocaleString()}₽
      </div>
    </div>
  );
}
