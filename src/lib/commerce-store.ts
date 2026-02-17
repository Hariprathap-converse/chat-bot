export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CommerceState {
  products: Product[];
  cart: CartItem[];
  isCartOpen: boolean;
  isCartExpanded: boolean;
  activeProduct: Product | null;
  isProductSheetOpen: boolean;
  isCheckoutOpen: boolean;
  isCartSheetOpen: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchProducts: (limit?: number) => Promise<void>;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, delta: number) => void;
  clearCart: () => void;
  setCartOpen: (isOpen: boolean) => void;
  setCartExpanded: (isExpanded: boolean) => void;
  setCartSheetOpen: (isOpen: boolean) => void;
  setProductSheetOpen: (isOpen: boolean, product?: Product) => void;
  setCheckoutOpen: (isOpen: boolean) => void;
}

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCommerceStore = create<CommerceState>()(
  persist(
    (set, get) => ({
      products: [],
      cart: [],
      isCartOpen: false,
      isCartExpanded: false,
      activeProduct: null,
      isProductSheetOpen: false,
      isCheckoutOpen: false,
      isCartSheetOpen: false,
      isLoading: false,
      error: null,

      fetchProducts: async (limit = 10) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(
            `https://dummyjson.com/products?limit=${limit}`,
          );
          const data = await response.json();
          set({ products: data.products, isLoading: false });
        } catch (error) {
          set({ error: "Failed to fetch products", isLoading: false });
        }
      },

      addToCart: (product) => {
        const { cart } = get();
        const existingItem = cart.find((item) => item.id === product.id);

        if (existingItem) {
          set({
            cart: cart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            ),
            isCartOpen: true, // Auto-open collapsed cart
          });
        } else {
          set({
            cart: [...cart, { ...product, quantity: 1 }],
            isCartOpen: true, // Auto-open collapsed cart
          });
        }
      },

      removeFromCart: (productId) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        }));
      },

      updateQuantity: (productId, delta) => {
        const { cart } = get();
        const updatedCart = cart.map((item) => {
          if (item.id === productId) {
            const newQuantity = Math.max(1, item.quantity + delta);
            return { ...item, quantity: newQuantity };
          }
          return item;
        });
        set({ cart: updatedCart });
      },

      clearCart: () => set({ cart: [] }),

      setCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
      setCartExpanded: (isExpanded) => set({ isCartExpanded: isExpanded }),
      setCartSheetOpen: (isOpen) => set({ isCartSheetOpen: isOpen }),
      setProductSheetOpen: (isOpen, product) =>
        set({ isProductSheetOpen: isOpen, activeProduct: product || null }),
      setCheckoutOpen: (isOpen) => set({ isCheckoutOpen: isOpen }),
    }),
    {
      name: "commerce-storage",
      partialize: (state) => ({ cart: state.cart }), // Persist only cart
    },
  ),
);
