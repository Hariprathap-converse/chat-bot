// "use client";

// import { Star, ShoppingCart } from "lucide-react";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { useCommerceStore, Product } from "@/lib/commerce-store";

// interface ProductCardProps {
//   product: Product;
// }

// export function ProductCard({ product }: ProductCardProps) {
//   const { addToCart, setCheckoutOpen, setProductSheetOpen } =
//     useCommerceStore();

//   const handleBuyNow = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     addToCart(product);
//     setCheckoutOpen(true);
//   };

//   const handleAddToCart = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     addToCart(product);
//   };

//   return (
//     <div
//       className="group relative flex flex-col w-[200px] h-fit bg-card rounded-xl border shadow-sm transition-all hover:shadow-md cursor-pointer overflow-hidden shrink-0"
//       onClick={() => setProductSheetOpen(true, product)}
//     >
//       {/* Top Section: Image & Overlay Actions */}
//       <div className="relative h-[150px] w-full bg-muted/20 pt-0 flex items-center justify-center overflow-hidden">
//         <Image
//           src={product.images[0]}
//           alt={product.title}
//           fill
//           className="object-contain group-hover:scale-105 transition-transform duration-300"
//           unoptimized
//         />

//         {/* Overlay Buttons */}
//         <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2 justify-center bg-gradient-to-t from-black/5 to-transparent pt-8">
//           <Button
//             size="sm"
//             className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full h-8 px-3 text-xs font-medium"
//             onClick={handleBuyNow}
//           >
//             Buy now
//           </Button>
//           <Button
//             size="sm"
//             className="bg-white text-black hover:bg-gray-100 rounded-full h-8 px-3 text-xs font-medium flex items-center gap-1"
//             onClick={handleAddToCart}
//           >
//             <ShoppingCart className="w-3 h-3" />
//             Add to cart
//           </Button>
//         </div>
//       </div>

//       {/* Bottom Section: Info */}
//       <div className="flex flex-col flex-1 p-2 pt-1 gap-1">
//         <h3
//           className="font-semibold text-base line-clamp-1 text-foreground"
//           title={product.title}
//         >
//           {product.title}
//         </h3>

//         <p className="text-sm text-muted-foreground font-medium capitalize">
//           {product.brand || product.category}
//         </p>

//         <div className=" flex items-end justify-between">
//           <div className="flex gap-1 items-center">
//             <span className="text-lg font-bold text-foreground">
//               ${product.price}
//             </span>
//             {/* Mock discount display */}
//             {product.discountPercentage > 0 && (
//               <span className="text-xs text-muted-foreground line-through">
//                 ($
//                 {(
//                   product.price *
//                   (1 + product.discountPercentage / 100)
//                 ).toFixed(2)}
//                 )
//               </span>
//             )}
//           </div>

//           <div className="flex absolute right-2.5 top-2 items-center gap-1 mb-1">
//             <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
//             <span className="text-xs font-semibold">{product.rating}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { Star, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCommerceStore, Product } from "@/lib/commerce-store";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, setCheckoutOpen } = useCommerceStore();

  const [expanded, setExpanded] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    setCheckoutOpen(true);
  };
  useEffect(() => {
    if (expanded) {
      setSelectedImage(product.images[0]);
    }
  }, [expanded, product.images]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div
      className={cn(
        "group relative flex flex-col bg-card  border-none hover:z-[60] shadow-sm transition-all duration-500 rounded-[9px] hover:shadow-md overflow-hidden shrink-0",
        expanded ? "w-[420px]" : "w-[200px] h-fit cursor-pointer",
      )}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Top Section */}
      <div
        className={cn(
          "relative w-full  flex items-start justify-end  overflow-hidden",
          expanded
            ? "h-[260px] transition-all  duration-700 my-1 "
            : "h-[150px]",
        )}
      >
        <Image
          src={selectedImage || product.images[0]}
          alt={product.title}
          fill
          className="object-contain group-hover:scale-105 pr-3 transition-transform duration-300"
        />

        {!expanded && (
          <div className="absolute inset-x-0 bottom-[-8px] p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-5 justify-center bg-gradient-to-t from-black/5 to-transparent pt-8">
            <Button size="sm" className="cursor-pointer" onClick={handleBuyNow}>
              Buy now
            </Button>
            <Button
              size="sm"
              className="bg-background text-foreground hover:bg-background hover:text-foreground cursor-pointer"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-3 h-3 mr-1" />
              Add
            </Button>
          </div>
        )}
        {expanded && (
          <div className="flex gap-2  overflow-auto flex-col p-2 hide-scrollbar">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(img);
                }}
                className={cn(
                  "relative w-16 h-16 rounded-md border-2  cursor-pointer overflow-hidden shrink-0 focus-visible:ring-0 outline-0 focus:ring-0",
                  selectedImage === img
                    ? "border-none shadow-[0_0_2px_1px_rgba(0,0,0,0.1)]"
                    : "border-transparent",
                )}
              >
                <Image
                  src={img}
                  alt="thumbnail"
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Section */}
      <div
        className={cn(
          expanded
            ? "flex  flex-1 justify-between p-4 pt-1 pb-1 gap-1"
            : "flex-col  flex-1 justify-between p-2 pt-1 gap-1",
        )}
      >
        <div>
          <h3
            className={cn(
              expanded
                ? "font-semibold text-base "
                : "font-medium text-[14px] ",
              "text-foreground line-clamp-1",
            )}
          >
            {product.title}
          </h3>

          <p
            className={cn(
              expanded ? "text-sm  font-medium " : "text-[13px]  font-normal ",
              "text-muted-foreground text-muted-foreground capitalize",
            )}
          >
            {product.brand || product.category}
          </p>
        </div>
        <div
          className={cn(
            expanded
              ? "flex flex-col "
              : "flex items-center flex-row-reverse justify-between",
          )}
        >
          <div className="flex items-center gap-1 justify-end">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-semibold">{product.rating}</span>
          </div>
          <div className="flex gap-2 items-center ">
            <span className="text-lg font-semibold">${product.price}</span>
            {product.discountPercentage > 0 && (
              <>
                <span
                  className={cn(
                    !expanded && "hidden",
                    "text-[12px] text-gray-400 line-through decoration-gray-500",
                  )}
                >
                  ($
                  {(
                    product.price *
                    (1 + product.discountPercentage / 100)
                  ).toFixed(2)}
                  )
                </span>
                <span
                  className={cn(
                    expanded && "hidden",
                    "text-xs font-medium text-green-500",
                  )}
                >
                  {product.discountPercentage}%
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* EXPANDED DETAILS */}
      {/* {expanded && (
        <div className="">
          <div className="p-3 border-t text-sm text-muted-foreground animate-in fade-in">
            {product.description}
          </div>
          <div className="flex gap-2 overflow-x-auto p-2 hide-scrollbar">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(img);
                }}
                className={cn(
                  "relative w-16 h-16 rounded-md border-2 overflow-hidden shrink-0",
                  selectedImage === img
                    ? "border-primary/50"
                    : "border-transparent",
                )}
              >
                <Image
                  src={img}
                  alt="thumbnail"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </button>
            ))}
          </div>
        </div>
      )} */}

      {expanded && (
        <div className="animate-in   fade-in">
          {/* Thumbnails */}

          <div className="p-3 text-sm text-muted-foreground">
            {product.description}
          </div>
          {/* ACTION BUTTONS (like sheet) */}
          <div className="p-3 pt-1 flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
            >
              Add to cart
            </Button>

            <Button
              className="flex-1"
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
                setCheckoutOpen(true);
              }}
            >
              Buy now
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
