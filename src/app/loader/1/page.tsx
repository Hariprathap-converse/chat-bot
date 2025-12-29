"use client";
import { useEffect, useState } from "react";

const WIDTHS = ["w-full", "w-3/4", "w-2/3", "w-1/2", "w-1/3", "w-1/4"];
const HEIGHTS = ["h-4", "h-5", "h-6", "h-8", "h-10", "h-16", "h-20", "h-40"];

const randomW = () => WIDTHS[Math.floor(Math.random() * WIDTHS.length)];
const randomH = () => HEIGHTS[Math.floor(Math.random() * HEIGHTS.length)];
const randomBlock = () => `${randomH()} ${randomW()}`;

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
    name: "Random Layout",
    rows: Array.from({ length: 6 }, () => {
      const cells = Math.floor(Math.random() * 3) + 1;
      return Array.from({ length: cells }, () => randomBlock());
    }),
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

export default function WebsiteAutoGenerator1() {
  const [layoutIndex, setLayoutIndex] = useState(0);
  const [visible, setVisible] = useState(0);
  const [fadingOut, setFadingOut] = useState(false);

  const current = layouts[layoutIndex];
  const done = visible >= current.rows.length;

  useEffect(() => {
    if (!done) {
      const increment = setTimeout(() => setVisible((v) => v + 1), 400);
      return () => clearTimeout(increment);
    }

    const fade = setTimeout(() => setFadingOut(true), 800);
    const next = setTimeout(() => {
      setLayoutIndex((i) => Math.min(i + 1, layouts.length - 1));
      setVisible(0);
      setFadingOut(false);
    }, 1000);

    return () => {
      clearTimeout(fade);
      clearTimeout(next);
    };
  }, [done, visible]);

  return (
    <div className=" max-w-3xl p-8 w-[900px] max-h-[500px] mx-auto">
      <div
        className={`transition-opacity duration-700 ${
          fadingOut ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="mb-4 text-sm text-neutral-500  uppercase tracking-wide">
          {current.name} generating…
        </div>

        <div className="space-y-4">
          {current.rows.slice(0, visible).map((row, i) => (
            <div key={i} className="flex gap-4">
              {row.map((cls, j) => (
                <div
                  key={j}
                  className={`shimmer   ${cls}  duration-1000  fade-up  `}
                  style={{ animationDelay: `${i * 50 + j * 300}ms` }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
