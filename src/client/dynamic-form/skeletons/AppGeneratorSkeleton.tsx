"use client";
import { useEffect, useState } from "react";

interface LayoutRow {
  name: string;
  rows: string[][];
}

const layouts = [
  {
    name: "Hero + Subgrid",
    rows: [
      ["h-64 w-full"],
      ["h-10 w-[60%]", "h-10 w-[30%]", "h-10 w-[60%]"],
      ["h-8  w-2/3", "h-8  w-1/2"],
      ["h-34 w-full"],
      ["h-10 w-[60%]", "h-10 w-[30%]", "h-10 w-[60%]"],
      ["h-8  w-2/3", "h-8  w-1/2"],
      ["h-32 w-full", "h-32 w-full"],
    ],
  },
  {
    name: "eCommerce Products",
    rows: [
      ["h-64 w-full"],
      ["h-8 w-[30%]", "h-8 w-[30%]", "h-8 w-[30%]", "h-8 w-[30%]"],
      ["h-40 w-1/3", "h-40 w-1/3", "h-40 w-1/3", "h-40 w-1/3"],
      ["h-40 w-1/3", "h-40 w-1/3", "h-40 w-1/3", "h-40 w-1/3"],
      ["h-9 w-[70%]", "h-9 w-[30%]"],
      ["h-30 w-full"],
    ],
  },
  {
    name: "SaaS Homepage",
    rows: [
      ["h-12 w-1/3", "h-12 w-1/3", "h-12 w-1/3"],
      ["h-60 w-full"],
      ["h-32 w-1/3", "h-32 w-1/3", "h-32 w-1/3"],
      ["h-20 w-1/4", "h-20 w-1/4", "h-20 w-1/4", "h-20 w-1/4"],
      ["h-20 w-full"],
      ["h-12 w-1/2", "h-12 w-1/3", "h-12 w-1/3"],
    ],
  },
  {
    name: "App Landing Section",
    rows: [
      ["h-72 w-full"],
      ["h-8 w-56"],
      ["h-8 w-1/2", "h-8 w-1/3"],
      ["h-40 w-1/2", "h-40 w-1/2"],
      ["h-20 w-full"],
      ["h-40 w-1/2", "h-40 w-1/2"],
    ],
  },
  {
    name: "Portfolio Mosaic",
    rows: [
      ["h-24 w-full"],
      ["h-48 w-1/2", "h-48 w-1/2"],
      ["h-32 w-1/3", "h-32 w-1/3", "h-32 w-1/3"],
      ["h-64 w-full"],
      ["h-20 w-full"],
    ],
  },
  {
    name: "Mobile Grid",
    rows: [
      ["h-40 w-full"],
      ["h-40 w-full"],
      ["h-40 w-1/2", "h-40 w-1/2"],
      ["h-40 w-1/3", "h-40 w-1/3", "h-40 w-1/3"],
      ["h-38 w-1/2", "h-38 w-1/2"],
    ],
  },

  {
    name: "Website Generated",
    rows: [
      ["h-20 w-full"],
      ["h-8 w-56", "h-8 w-56"],
      ["h-6 w-1/2", "h-6 w-1/2"],
      ["h-6 w-1/3", "h-6 w-1/3", "h-6 w-1/3"],
      ["h-20 w-full"],
      ["h-20 w-full", "h-20 w-full", "h-20 w-full"],
      ["h-20 w-full"],
      ["h-40 w-full"],
      ["h-8 w-56", "h-8 w-56"],
      ["h-6 w-1/2", "h-6 w-1/2"],
      ["h-6 w-1/3", "h-6 w-1/3", "h-6 w-1/3"],
    ],
  },
];

export default function WebsiteAutoGenerator() {
  const [layoutIndex, setLayoutIndex] = useState(0);
  const [visible, setVisible] = useState(0);
  const [fadingOut, setFadingOut] = useState(false);

  const current = layouts[layoutIndex];
  const done = visible >= current.rows.length;

  useEffect(() => {
    if (!done) {
      const increment = setTimeout(() => setVisible((v) => v + 1), 160);
      return () => clearTimeout(increment);
    }

    const fade = setTimeout(() => setFadingOut(true), 300);
    const next = setTimeout(() => {
      setLayoutIndex((i) => Math.min(i + 1, layouts.length - 1));
      setVisible(0);
      setFadingOut(false);
    }, 850);

    return () => {
      clearTimeout(fade);
      clearTimeout(next);
    };
  }, [done, visible]);

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div
        className={`transition-opacity duration-700 ${
          fadingOut ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="mb-4 text-sm text-neutral-500 uppercase tracking-wide">
          {current.name} generating…
        </div>

        <div className="space-y-4">
          {current.rows.slice(0, visible).map((row, i) => (
            <div key={i} className="flex gap-4 flex-wrap">
              {row.map((cls, j) => (
                <div
                  key={j}
                  className={`shimmer ai-glow ai-scan ${cls} !animate-pulse !duration-500 fade-up`}
                  style={{ animationDelay: `${i * 150 + j * 300}ms` }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
