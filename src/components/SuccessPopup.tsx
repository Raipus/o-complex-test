import React from "react";

interface SuccessPopupProps {
  onClose: () => void;
}

export default function SuccessPopup({ onClose }: SuccessPopupProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl text-center max-w-md w-full text-black">
        <svg
          className="w-16 h-16 text-green-500 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <h2 className="text-2xl font-bold mb-4">Заказ оформлен успешно!</h2>
        <p className="mb-6">
          Спасибо за ваш заказ. Наш менеджер свяжется с вами в ближайшее время
          для подтверждения.
        </p>
        <button
          onClick={onClose}
          className="bg-[#222222] text-white px-6 py-2 rounded-2xl transition"
        >
          Продолжить покупки
        </button>
      </div>
    </div>
  );
}
