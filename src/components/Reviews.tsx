"use client";

import { useState, useEffect } from "react";
import { ReviewsService } from "@/services/api/reviews";
import type { Review } from "@/services/api/reviews";

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await ReviewsService.getAll();
        setReviews(data);
      } catch (err) {
        setError("Ошибка при загрузке отзывов");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return <div className="flex justify-center py-8">Загружаем отзывы...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-50 border-red-200 text-red-700 px-4 py-3 rounded-2xl max-w-2xl mx-auto my-6 border-4 text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review.id}
              className="bg-[#D9D9D9] rounded-2xl overflow-hidden hover:scale-105 duration-300"
            >
              <div className="p-5">
                <div
                  className="prose-p:my-2 prose-h1:my-3 prose-h1:font-bold max-w-none text-black"
                  dangerouslySetInnerHTML={{ __html: review.text }}
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-2">
            Отзывов пока нет
          </p>
        )}
      </div>
    </div>
  );
};

export default Reviews;
