"use client";

import { useCommerceStore } from "@/lib/commerce-store";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetClose,
    SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Minus, Plus, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function ProductDetailSheet() {
    const {
        isProductSheetOpen,
        setProductSheetOpen,
        activeProduct,
        addToCart,
        setCheckoutOpen
    } = useCommerceStore();

    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState<string>("");

    useEffect(() => {
        if (activeProduct) {
            setSelectedImage(activeProduct.images[0]);
            setQuantity(1);
        }
    }, [activeProduct]);

    if (!activeProduct) return null;

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(activeProduct);
        }
        setProductSheetOpen(false);
    };

    const handleBuyNow = () => {
        handleAddToCart(); // Or specialized logic
        setCheckoutOpen(true);
    };

    return (
        <Sheet open={isProductSheetOpen} onOpenChange={(open) => setProductSheetOpen(open)}>
            <SheetContent className="w-full sm:max-w-md p-0 overflow-y-auto flex flex-col z-[100]">

                {/* Header */}
                <div className="p-4 flex items-center gap-2 border-b sticky top-0 bg-background z-10">
                    <button
                        onClick={() => setProductSheetOpen(false)}
                        className="p-2 hover:bg-muted rounded-full"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    <span className="font-semibold text-lg line-clamp-1 flex-1">
                        {activeProduct.title}
                    </span>
                </div>

                {/* Body */}
                <div className="flex-1 flex flex-col p-6 gap-6">
                    {/* Main Image */}
                    <div className="aspect-square relative bg-muted/20 rounded-xl overflow-hidden flex items-center justify-center">
                        <Image
                            src={selectedImage || activeProduct.thumbnail}
                            alt={activeProduct.title}
                            fill
                            className="object-contain p-4"
                            unoptimized
                        />
                    </div>

                    {/* Thumbnails */}
                    <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
                        {activeProduct.images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedImage(img)}
                                className={cn(
                                    "relative w-16 h-16 rounded-md border-2 overflow-hidden shrink-0",
                                    selectedImage === img ? "border-primary" : "border-transparent"
                                )}
                            >
                                <Image src={img} alt="thumbnail" fill className="object-cover" unoptimized />
                            </button>
                        ))}
                    </div>

                    {/* Info */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-2xl font-bold">{activeProduct.title}</h2>
                                <p className="text-muted-foreground font-medium">{activeProduct.brand}</p>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-primary">${activeProduct.price}</div>
                                <div className="flex items-center gap-1 justify-end mt-1">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    <span className="font-medium text-sm">{activeProduct.rating}</span>
                                </div>
                            </div>
                        </div>

                        <div className="prose prose-sm dark:prose-invert">
                            <p>{activeProduct.description}</p>
                        </div>

                        {/* Mock Options */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Color</label>
                                <div className="flex gap-2">
                                    <div className="w-8 h-8 rounded-full bg-black border-2 border-primary cursor-pointer ring-2 ring-offset-2 ring-primary/50"></div>
                                    <div className="w-8 h-8 rounded-full bg-blue-500 cursor-pointer hover:opacity-80"></div>
                                    <div className="w-8 h-8 rounded-full bg-gray-200 cursor-pointer hover:opacity-80"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t sticky bottom-0 bg-background z-10 space-y-4 shadow-[0_-5px_10px_rgba(0,0,0,0.05)]">
                    <div className="flex items-center justify-between">
                        <span className="font-medium">Quantity</span>
                        <div className="flex items-center gap-3 bg-muted rounded-full p-1">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-background shadow-sm transition"
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-4 text-center font-medium">{quantity}</span>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-background shadow-sm transition"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <Button
                            variant="outline"
                            size="lg"
                            className="rounded-full w-full"
                            onClick={handleAddToCart}
                        >
                            Add to cart
                        </Button>
                        <Button
                            size="lg"
                            className="rounded-full w-full"
                            onClick={handleBuyNow}
                        >
                            Buy now
                        </Button>
                    </div>
                </div>

            </SheetContent>
        </Sheet>
    );
}
