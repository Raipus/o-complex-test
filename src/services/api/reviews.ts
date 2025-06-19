import { api } from "../axios-config";

export interface Review {
  id: number;
  text: string;
}

export const ReviewsService = {
  async getAll(): Promise<Review[]> {
    const { data } = await api.get<Review[]>("/reviews");
    return data;
  },
};
