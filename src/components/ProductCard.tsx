import React from "react";
import { Product } from "@/services/api/store";
import { CartActions } from "@/components/Cart";

interface ProductCardProps {
  product: Product;
  cart: Record<number, number>;
  onCartUpdate: CartActions["updateQuantity"];
  onCartAdd: CartActions["addToCart"];
}

export default function ProductCard({
  product,
  cart,
  onCartUpdate,
  onCartAdd,
}: ProductCardProps) {
  const inCart = cart[product.id] > 0;

  return (
    <div className="bg-[#D9D9D9] rounded-2xl p-4 text-black text-center text-2xl">
      <img
        src={product.image_url}
        alt={product.title}
        className="w-full h-48 object-contain mb-4 rounded-2xl"
      />
      <h3 className="text-4xl text-center min-h-32">{product.title}</h3>
      <p className="mb-2 min-h-32">{product.description}</p>
      <p>Цена: {product.price.toLocaleString()}₽</p>

      {inCart ? (
        <div className="flex items-center mt-3 text-4xl">
          <button
            className="bg-[#222222] px-6 py-3 rounded-2xl text-white hover:scale-105 duration-300"
            onClick={() => onCartUpdate(product.id, cart[product.id] - 1)}
          >
            -
          </button>
          <input
            type="number"
            min="1"
            value={cart[product.id]}
            onChange={(e) =>
              onCartUpdate(
                product.id,
                Math.max(1, parseInt(e.target.value) || 1)
              )
            }
            className="w-full text-center bg-[#222222] px-7 py-3 rounded-2xl text-white mx-1 [&::-webkit-inner-spin-button]:appearance-none"
          />
          <button
            className="bg-[#222222] px-6 py-3 rounded-2xl text-white hover:scale-105 duration-300"
            onClick={() => onCartUpdate(product.id, cart[product.id] + 1)}
          >
            +
          </button>
        </div>
      ) : (
        <button
          className="mt-3 bg-[#222222] text-white px-4 py-4 rounded-2xl w-full hover:scale-105 duration-300"
          onClick={() => onCartAdd(product.id)}
        >
          Купить
        </button>
      )}
    </div>
  );
}
