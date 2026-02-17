"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { NavChatBot } from "@/Icons/global/home";

const images = [
  {
    src: "/image-ai-analysis/chat_interface.png",
    alt: "Productive Workflow",
    title: "Optimized AI Workflows",
    description:
      "Streamline your daily tasks with an interface designed for speed and intelligent automation.",
  },
  {
    src: "/image-ai-analysis/mcp.png",
    alt: "Model Context Protocol",
    title: "Unified AI Architecture",
    description:
      "Seamlessly integrate multiple AI tools and data sources with our robust MCP implementation.",
  },
  {
    src: "/image-ai-analysis/illustrater-dashborad.png",
    alt: "Advanced Analytics",
    title: "Advanced Data Analytics",
    description:
      "Turn complex data into actionable insights with real-time AI-powered visualization.",
  },
  {
    src: "/image-ai-analysis/neural.png",
    alt: "Neural Networks",
    title: "Deep Learning Insights",
    description:
      "Leverage powerful neural networks to uncover hidden patterns and drive innovation.",
  },
  {
    src: "/image-ai-analysis/intelligent-conversation.png",
    alt: "Intelligent Conversations",
    title: "Intelligent AI Conversations",
    description:
      "Experience the next generation of human-AI interaction with our advanced language models.",
  },
  {
    src: "/image-ai-analysis/dashboard.jpg",
    alt: "Advanced Analytics",
    title: "Advanced Data Analytics",
    description:
      "Turn complex data into actionable insights with real-time AI-powered visualization.",
  },
  {
    src: "/image-ai-analysis/illustrater-dashborad.png",
    alt: "Advanced Analytics",
    title: "Advanced Data Analytics",
    description:
      "Turn complex data into actionable insights with real-time AI-powered visualization.",
  },
  {
    src: "/image-ai-analysis/galssy-message-box.jpg",
    alt: "Modern Interface",
    title: "Sleek Modern Interface",
    description:
      "A beautiful, glassmorphism-inspired design crafted for clarity and effortless productivity.",
  },
];

export function AuthCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-transparent shadow-2xl rounded-2xl">
      {images.map((image, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0",
          )}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="2xl:object-cover object-fit transition-transform duration-[10000ms] ease-linear transform"
            style={{
              transform: index === currentIndex ? "scale(1.1)" : "scale(1)",
            }}
            priority={index === 0}
          />
          {/* Balanced gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />

          <div className="absolute inset-0 z-20 flex flex-col justify-end p-12 lg:p-20 2xl:pb-10 text-white">
            <div
              className={cn(
                "transition-all duration-1000 delay-300 transform",
                index === currentIndex
                  ? "translate-y-0 opacity-100"
                  : "translate-y-12 opacity-0",
              )}
            >
              <h2 className="text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight leading-tight max-w-2xl text-shadow-lg">
                {image.title}
              </h2>
              <p className="text-xl lg:text-2xl text-white/90 max-w-2xl font-light leading-relaxed mb-8 drop-shadow-md">
                {image.description}
              </p>
            </div>

            <div className="flex gap-3 mb-4">
              {images.map((_, dotIndex) => (
                <button
                  key={dotIndex}
                  onClick={() => setCurrentIndex(dotIndex)}
                  className={cn(
                    "h-2.5 rounded-full transition-all duration-500 cursor-pointer shadow-sm relative overflow-hidden",
                    dotIndex === currentIndex
                      ? "w-12 bg-white"
                      : "w-2.5 bg-white/30 hover:bg-white/50",
                  )}
                  aria-label={`Go to slide ${dotIndex + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* High-end glassmorphism branding */}
      <div className="absolute top-4 left-4 z-30 backdrop-blur-xl bg-white/5 rounded-[10px] px-6 py-4 border border-white/10 shadow-xl transition-all duration-300 hover:bg-white/10">
        <div className="flex items-center ">
          <div className="relative ">
            {/* <div className="absolute inset-0 bg-white/20 blur-md rounded-full scale-150 animate-pulse" />
                        <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-[#7468FC] to-[#FF8FD9] flex items-center justify-center shadow-lg">
                            <NavChatBot className="w-7 h-7 text-white" />
                        </div> */}
            <Image
              src="/image-ai-analysis/cdspng.webp"
              alt="Logo"
              width={200}
              height={200}
              className="rounded-2xl object-cover"
            />
          </div>
          {/* <div className="flex flex-col">
                        <span className="text-white font-bold text-lg tracking-wider">OpsBot AI</span>
                        <span className="text-white/60 text-xs font-medium tracking-widest uppercase">Next-Gen Intelligence</span>
                    </div> */}
        </div>
      </div>

      {/* Subtle light effect in top right */}
      <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full z-0 pointer-events-none" />
    </div>
  );
}
