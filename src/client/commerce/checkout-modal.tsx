"use client";

import { useCommerceStore } from "@/lib/commerce-store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { CheckCircle2, Lock, MapPin, CreditCard } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

export function CheckoutModal() {
  const { isCheckoutOpen, setCheckoutOpen, cart, clearCart } =
    useCommerceStore();
  const [step, setStep] = useState<"checkout" | "success">("checkout");
  const [loading, setLoading] = useState(false);

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const total = subtotal; // + taxes/shipping

  const handlePay = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep("success");
      clearCart();
      toast.success("Order Placed Successfully!");
    }, 1500);
  };

  const handleClose = () => {
    setCheckoutOpen(false);
    // Reset after animation
    setTimeout(() => setStep("checkout"), 300);
  };

  return (
    <Dialog open={isCheckoutOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] p-0 gap-0 z-70 overflow-hidden">
        {step === "checkout" && (
          <>
            <DialogHeader className="p-6 pb-4 border-b">
              <DialogTitle className="flex items-center gap-2 text-xl">
                <Lock className="w-5 h-5 text-primary" />
                Secure Checkout
              </DialogTitle>
            </DialogHeader>

            <div className="p-6 space-y-6 pb-3">
              {/* Address Section Mock */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    Delivery Address
                  </h3>
                  <Button
                    variant="link"
                    size="sm"
                    className="h-auto p-0 text-primary"
                  >
                    Edit
                  </Button>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg text-sm text-muted-foreground border">
                  <p className="text-foreground font-medium">John Doe</p>
                  <p>123 Innovation Drive, Tech Valley</p>
                  <p>CA 94043, United States</p>
                </div>
              </div>

              {/* Order Summary */}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm">Order Summary</h3>
                <div className="max-h-[120px] overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="relative w-8 h-8 rounded border overflow-hidden shrink-0">
                          <Image
                            src={item.thumbnail}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="line-clamp-1 max-w-[180px]">
                          {item.title}
                        </span>
                        <span className="text-muted-foreground">
                          x{item.quantity}
                        </span>
                      </div>
                      <span className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t my-2 mb-0 pt-2 flex justify-between items-center">
                  <span className="font-bold">Total to Pay</span>
                  <span className="font-bold text-xl text-primary">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <Button
                onClick={handlePay}
                className="w-full h-12 text-base rounded-lg shadow-lg shadow-primary/20"
                disabled={loading}
              >
                {loading ? "Processing..." : `Pay $${total.toFixed(2)}`}
              </Button>
              <p className="text-center text-xs text-muted-foreground mt-3 flex items-center justify-center gap-1">
                <Lock className="w-3 h-3" />
                Encrypted and secured payment
              </p>
            </div>
          </>
        )}

        {step === "success" && (
          <div className="flex flex-col items-center justify-center p-10 text-center space-y-4 animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-2">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              Order Successful!
            </h2>
            <p className="text-muted-foreground max-w-[260px]">
              Your payment was processed successfully. You will receive a
              confirmation email shortly.
            </p>
            <DialogTitle className="sr-only">Order Successful</DialogTitle>
            <div className="pt-4 w-full">
              <Button
                onClick={handleClose}
                className="w-full rounded-full"
                variant="outline"
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
