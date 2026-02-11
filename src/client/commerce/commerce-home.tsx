"use client";
import { useEffect, useRef, useState } from "react";
import { AppSidebar } from "@/client/app-sidebar";
import Profile from "@/client/profile";
import { useChatMessages } from "@/hooks/use-chat-messages";
import { ChatInput } from "@/components/chat/chat-input";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { BotTypingLoader } from "@/components/chat/dot-loader";
import ModelSelection from "@/components/chat/model-selection";
import { CommerceChatMessage } from "./commerce-chat-message";
import { CartBanner } from "./cart-banner";
import { ProductDetailSheet } from "./product-detail-sheet";
import { CheckoutModal } from "./checkout-modal";
import { CartSheet } from "./cart-sheet";
import { useCommerceStore } from "@/lib/commerce-store";
import { ProductCarousel } from "./product-carousel";
import { ShoppingCart } from "lucide-react";

export default function CommerceHome() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // We reuse the existing chat hooks but will inject commerce specific logic
  const { messages, input, setInput, sendMessage, botTyping } =
    useChatMessages();

  // Commerce Store
  const { cart, isCartOpen, setCartOpen, fetchProducts } = useCommerceStore();
  const [showCarousel, setShowCarousel] = useState(false);

  // Fetch products on mount to have them ready
  useEffect(() => {
    fetchProducts();
  }, []);

  // Simplified scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showCarousel, isCartOpen]);

  // Group messages
  const grouped = [];
  for (let i = 0; i < messages.length; i += 2) {
    grouped.push([messages[i], messages[i + 1]]);
  }

  // Effect to trigger carousel after bot response (Mocking the trigger logic)
  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].role === "bot") {
      setShowCarousel(true);
    }
  }, [messages]);

  return (
    <div className="bg-background relative min-h-screen w-full pb-0 pr-1 flex flex-col item-center justify-center">
      {/* Header - Profile & Cart */}
      <div className="absolute right-30 top-3 z-50">
        <ModelSelection />
      </div>

      <div className="absolute right-3 top-1.5 z-50">
        <Profile />
      </div>
      {/* Cart Icon */}
      <div
        className="absolute  right-18 top-3 z-50   p-2 hover:bg-muted/50 rounded-full transition cursor-pointer!"
        onClick={() => {
          const { useCommerceStore } = require("@/lib/commerce-store");
          const store = useCommerceStore.getState();
          store.setCartSheetOpen(true);
        }}
      >
        <ShoppingCart className="h-5 w-5 text-foreground cursor-pointer" />
        <CartBadge />
      </div>

      {/* Sidebar */}
      <div className="absolute left-5 rounded-2xl top-5 z-40">
        <AppSidebar />
      </div>

      {/* Main Commerce Chat Area */}
      <main className="grid grid-rows-[1fr_auto] pb-0 w-full h-full pt-[50px] max-h-screen overflow-hidden items-center relative">
        <div
          ref={containerRef}
          className="w-full flex flex-col h-full mx-auto overflow-y-auto pt-[5px] gap-6 pb-4 px-4 md:px-0"
        >
          <div className="w-full max-w-full sm:max-w-[90%] md:max-w-[78%] lg:max-w-[80%] xl:max-w-[74%] xl:mx-auto md:mr-[calc(100%-90%)] 2xl:max-w-[57%] flex flex-col h-full sm:mx-auto gap-5 pb-24 px-2 md:px-0">
            {/* Welcome Message */}
            {messages.length === 0 && (
              <div className="text-center mt-20 text-muted-foreground">
                <h2 className="text-2xl font-bold mb-2">Agentic Commerce</h2>
                <p>Ask me to find products for you!</p>
              </div>
            )}

            {grouped.map((pair, idx) => (
              <div key={`group-${idx}`} className="flex flex-col gap-[10px]">
                {pair[0] && (
                  <CommerceChatMessage message={pair[0]} index={idx} isUser />
                )}
                {pair[1] && (
                  <div className="flex flex-col">
                    <CommerceChatMessage
                      message={pair[1]}
                      index={idx}
                      isUser={false}
                    />

                    {showCarousel && idx === grouped.length - 1 && (
                      <div className="ml-10 -mt-2">
                        <ProductCarousel />
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {botTyping && <BotTypingLoader />}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Floating Collapsed Cart Banner */}
        {cart.length > 0  && (
          <div className="absolute bottom-[90px] left-1/2 -translate-x-1/2 w-full max-w-[500px] z-50 px-0">
            <CartBanner />
          </div>
        )}

        {/* Input Area */}
        <div className="flex mx-auto z-40 flex-col-reverse p-5 md:px-0 pt-0 w-full md:max-w-[76%] lg:max-w-[80%] xl:max-w-[75%] 2xl:max-w-[58%] bg-gradient-to-t from-background via-background to-transparent pb-6">
          <ChatInput
            value={input}
            onChange={setInput}
            onSend={sendMessage}
            placeholder="Search for products..."
            buttonIcon="SendIcon"
          />
        </div>
      </main>
      <ProductDetailSheet />
      <CheckoutModal />
      <CartSheet />
    </div>
  );
}

function CartBadge() {
  const { useCommerceStore } = require("@/lib/commerce-store");
  const cart = useCommerceStore((state: any) => state.cart);
  const count =
    cart?.reduce((acc: number, item: any) => acc + item.quantity, 0) || 0;

  if (count === 0) return null;

  return (
    <span className="absolute cursor-pointer top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center animate-in zoom-in">
      {count}
    </span>
  );
}
