"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCommerceStore } from "@/lib/commerce-store";
import { ProductCard } from "./product-card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function ProductCarousel() {
    const { products, isLoading } = useCommerceStore();
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener("resize", checkScroll);
        return () => window.removeEventListener("resize", checkScroll);
    }, [products]);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const scrollAmount = 300;
            scrollRef.current.scrollBy({
                left: direction === "right" ? scrollAmount : -scrollAmount,
                behavior: "smooth",
            });
            // Allow smooth scroll to finish before checking
            setTimeout(checkScroll, 300);
        }
    };

    if (isLoading && products.length === 0) {
        return (
            <div className="flex gap-4 overflow-hidden py-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="w-[260px] h-[380px] bg-muted/10 animate-pulse rounded-xl" />
                ))}
            </div>
        );
    }

    if (products.length === 0) return null;

    return (
        <div className="relative group/carousel w-full max-w-full">
            {/* Scroll Buttons */}
            {canScrollLeft && (
                <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm shadow-md border-border ml-[-20px] md:ml-[-10px] lg:ml-0"
                    onClick={() => scroll("left")}
                >
                    <ChevronLeft className="h-6 w-6" />
                </Button>
            )}

            {canScrollRight && (
                <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm shadow-md border-border mr-[-20px] md:mr-[-10px] lg:mr-0"
                    onClick={() => scroll("right")}
                >
                    <ChevronRight className="h-6 w-6" />
                </Button>
            )}

            {/* Scroll Container */}
            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto scroll-smooth py-4 px-1 hide-scrollbar"
                onScroll={checkScroll}
            >
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
