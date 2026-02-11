"use client";

import { useCommerceStore } from "@/lib/commerce-store";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import Image from "next/image";

export function CartSheet() {
    const {
        cart,
        isCartSheetOpen,
        setCartSheetOpen,
        updateQuantity,
        removeFromCart,
        setCheckoutOpen
    } = useCommerceStore();

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleCheckout = () => {
        setCartSheetOpen(false);
        setCheckoutOpen(true);
    };

    return (
        <Sheet open={isCartSheetOpen} onOpenChange={setCartSheetOpen}>
            <SheetContent className="w-full sm:max-w-md flex flex-col p-0">

                {/* Header */}
                <SheetHeader className="p-4 border-b flex flex-row items-center justify-between space-y-0">
                    <SheetTitle className="flex items-center gap-2 text-lg">
                        <ShoppingCart className="w-5 h-5" />
                        Your Cart
                        {totalItems > 0 && (
                            <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full font-medium ml-2">
                                {totalItems} items
                            </span>
                        )}
                    </SheetTitle>
                </SheetHeader>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {cart.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-[50vh] text-muted-foreground gap-2">
                            <ShoppingCart className="w-12 h-12 opacity-20" />
                            <p>Your cart is empty.</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {cart.map((item) => (
                                <div key={item.id} className="flex gap-4 border-b pb-4 last:border-0 last:pb-0">
                                    <div className="relative w-20 h-20 bg-muted rounded-lg overflow-hidden shrink-0 border">
                                        <Image src={item.thumbnail} alt={item.title} fill className="object-cover" unoptimized />
                                    </div>

                                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                                        <div className="space-y-1">
                                            <h4 className="font-medium text-sm line-clamp-2 leading-tight">{item.title}</h4>
                                            <p className="text-xs text-muted-foreground capitalize">{item.brand}</p>
                                        </div>

                                        <div className="flex items-center justify-between mt-2">
                                            <span className="font-bold text-sm">${item.price}</span>
                                            <div className="flex items-center gap-3 bg-muted/50 border rounded-full px-2 py-0.5">
                                                <button
                                                    onClick={() => updateQuantity(item.id, -1)}
                                                    className="w-6 h-6 flex items-center justify-center hover:bg-background rounded-full transition text-muted-foreground hover:text-foreground"
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="text-xs font-medium w-4 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, 1)}
                                                    className="w-6 h-6 flex items-center justify-center hover:bg-background rounded-full transition text-muted-foreground hover:text-foreground"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-muted-foreground hover:text-red-500 self-start p-1 -mr-2 -mt-2 opacity-50 hover:opacity-100 transition"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {cart.length > 0 && (
                    <div className="p-4 border-t bg-muted/5 space-y-4 shadow-[0_-5px_10px_rgba(0,0,0,0.03)] pb-8">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span className="font-medium">${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Shipping</span>
                                <span className="font-medium text-green-600">Free</span>
                            </div>
                            <div className="border-t border-dashed my-2" />
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-lg">Total</span>
                                <span className="font-bold text-xl text-primary">${subtotal.toFixed(2)}</span>
                            </div>
                        </div>

                        <Button onClick={handleCheckout} className="w-full rounded-full h-11 text-base font-semibold shadow-lg shadow-primary/20" size="lg">
                            Proceed to Checkout
                        </Button>
                    </div>
                )}

            </SheetContent>
        </Sheet>
    );
}
