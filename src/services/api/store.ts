import { api } from "../axios-config";

export interface Product {
  id: number;
  image_url: string;
  title: string;
  description: string;
  price: number;
}

export interface ProductsResponse {
  page: number;
  amount: number;
  total: number;
  items: Product[];
}

export interface CartItem {
  id: number;
  quantity: number;
}

export interface OrderRequest {
  phone: string;
  cart: CartItem[];
}

export interface OrderResponse {
  success: number;
  error?: string;
}

export const StoreService = {
  async getProducts(page: number, pageSize: number): Promise<ProductsResponse> {
    const { data } = await api.get<ProductsResponse>(
      `/products?page=${page}&page_size=${pageSize}`
    );
    return data;
  },

  async createOrder(orderData: OrderRequest): Promise<OrderResponse> {
    const { data } = await api.post<OrderResponse>("/order", orderData);
    return data;
  },
};
