"use client";

import { useCommerceStore } from "@/lib/commerce-store";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CartBadge } from "./commerce-home";

export function CartBanner() {
  const cart = useCommerceStore((s) => s.cart);
  const isCartExpanded = useCommerceStore((s) => s.isCartExpanded);
  const setCartExpanded = useCommerceStore((s) => s.setCartExpanded);
  const updateQuantity = useCommerceStore((s) => s.updateQuantity);
  const removeFromCart = useCommerceStore((s) => s.removeFromCart);
  const setCheckoutOpen = useCommerceStore((s) => s.setCheckoutOpen);

  const variant = isCartExpanded ? "expanded" : "collapsed";

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  if (cart.length === 0) return null;

  /* ---------------- COLLAPSED ---------------- */

  if (variant === "collapsed") {
    return (
      <div
        onMouseEnter={() => {
          const { useCommerceStore } = require("@/lib/commerce-store");
          const store = useCommerceStore.getState();
          store.setCartSheetOpen(true);
        }}
        className="w-full bg-white dark:bg-card border rounded-xl shadow-sm p-2 px-1 flex flex-col items-center justify-between"
      >
        <div className="flex items-center flex-col gap-3">
          <div
            className="relative p-1 hover:bg-muted/50 mb-2  rounded-full transition cursor-pointer!"
            onClick={() => {
              const { useCommerceStore } = require("@/lib/commerce-store");
              const store = useCommerceStore.getState();
              store.setCartSheetOpen(true);
            }}
          >
            <div className="bg-primary/10 p-2 rounded-lg">
              <ShoppingCart className="w-5 h-5 text-primary" />
            </div>
            <CartBadge />
          </div>
        </div>

        <div className="flex items-center flex-col gap-4 py-1 pb-1.5">
          <div className="flex flex-col -space-x-2">
            {cart.slice(0, 5).map((item) => (
              <div
                key={item.id}
                className="relative w-8 h-8 rounded-full border-2 border-background overflow-hidden bg-white"
              >
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          {/* <div className="flex items-center flex-col gap-2">
            <span className="font-bold text-sm">${subtotal.toFixed(2)}</span>

            <Button
              size="sm"
              variant="ghost"
              onClick={() => setCartExpanded(true)}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <Button
              size="sm"
              onClick={() => setCheckoutOpen(true)}
              className="rounded-full h-8 px-4 text-xs font-medium"
            >
              Checkout
            </Button>
          </div> */}
        </div>
      </div>
    );
  }

  /* ---------------- EXPANDED ---------------- */

  return (
    <div className="w-full bg-white dark:bg-card border  rounded-xl shadow-lg flex flex-col">
      {/* Header */}
      <div className="p-4 py-2 border-b flex items-center justify-between bg-muted/30 rounded-t-xl">
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-4 h-4 text-primary" />
          <span className="font-semibold">Cart</span>
          <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full font-medium">
            {totalItems} items
          </span>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCartExpanded(false)}
          className="hover:bg-transparent cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-4 max-h-[300px] overflow-y-auto">
        {cart.map((item) => (
          <div key={item.id} className="flex gap-3 items-center relative">
            <div className="relative w-16 h-16 bg-muted rounded-lg overflow-hidden shrink-0 border">
              <Image
                src={item.thumbnail}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1">
              <h4 className="font-medium text-sm">{item.title}</h4>
              <p className="text-xs text-muted-foreground">{item.brand}</p>

              <div className="flex items-center justify-between ">
                <span className="font-bold text-sm">${item.price}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-muted rounded-full px-2 py-0.5">
              <button
                className="cursor-pointer"
                onClick={() => updateQuantity(item.id, -1)}
              >
                -
              </button>
              <span className="text-xs">{item.quantity}</span>
              <button
                className="cursor-pointer"
                onClick={() => updateQuantity(item.id, 1)}
              >
                +
              </button>
            </div>
            <button onClick={() => removeFromCart(item.id)}>
              <Trash2 className="w-4 h-4 cursor-pointer" />
            </button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 bg-muted/30 rounded-b-xl">
        <div className="flex justify-between font-bold mb-3">
          <span>Total</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <Button
          onClick={() => setCheckoutOpen(true)}
          className="w-full rounded-full"
        >
          Checkout
        </Button>
      </div>
    </div>
  );
}
