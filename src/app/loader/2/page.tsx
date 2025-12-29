"use client";
import { useEffect, useState } from "react";

const WIDTHS = [
  "basis-full",
  "basis-3/4",
  "basis-2/3",
  "basis-1/2",
  "basis-1/3",
  "basis-1/4",
];

// random block generator (width only)
const randomW = () => WIDTHS[Math.floor(Math.random() * WIDTHS.length)];
const randomBlock = () => `${randomW()} flex-1`;

const layouts = [
  {
    name: "Hero + Subgrid",
    rows: [
      ["flex-1 basis-full"],

    //   ["flex-1 basis-[60%]", "flex-1 basis-[30%]", "flex-1 basis-[60%]"],
    //   ["flex-1 basis-2/3", "flex-1 basis-1/2"],

    //   ["flex-1 basis-full"],

      ["flex-1 basis-[60%]", "flex-1 basis-[30%]", "flex-1 basis-[60%]"],
      ["flex-1 basis-2/3", "flex-1 basis-1/2"],

      ["flex-1 basis-full", "flex-1 basis-full"],
    ],
  },

  {
    name: "eCommerce Products",
    rows: [
      ["flex-1 basis-full"],

      [
        "flex-1 basis-[30%]",
        "flex-1 basis-[30%]",
        "flex-1 basis-[30%]",
        "flex-1 basis-[30%]",
      ],

      [
        "flex-1 basis-1/3",
        "flex-1 basis-1/3",
        "flex-1 basis-1/3",
        "flex-1 basis-1/3",
      ],
    //   [
    //     "flex-1 basis-1/3",
    //     "flex-1 basis-1/3",
    //     "flex-1 basis-1/3",
    //     "flex-1 basis-1/3",
    //   ],

      ["flex-1 basis-[70%]", "flex-1 basis-[30%]"],

    //   ["flex-1 basis-full"],
    ],
  },

  {
    name: "SaaS Homepage",
    rows: [
      ["flex-1 basis-1/3", "flex-1 basis-1/3", "flex-1 basis-1/3"],

      ["flex-1 basis-full"],

      ["flex-1 basis-1/3", "flex-1 basis-1/3", "flex-1 basis-1/3"],

      [
        "flex-1 basis-1/4",
        "flex-1 basis-1/4",
        // "flex-1 basis-1/4",
        // "flex-1 basis-1/4",
      ],

      ["flex-1 basis-full"],

      ["flex-1 basis-1/2", "flex-1 basis-1/3", "flex-1 basis-1/3"],
    ],
  },

  {
    name: "App Landing Section",
    rows: [
      ["flex-1 basis-full"],

    //   ["flex-1 basis-56"],

    //   ["flex-1 basis-1/2", "flex-1 basis-1/3"],

      ["flex-1 basis-1/2", "flex-1 basis-1/2"],

      ["flex-1 basis-full"],

      ["flex-1 basis-1/2", "flex-1 basis-1/2"],
    ],
  },

  {
    name: "Portfolio Mosaic",
    rows: [
      ["flex-1 basis-full"],

    //   ["flex-1 basis-1/2", "flex-1 basis-1/2"],

      ["flex-1 basis-1/3", "flex-1 basis-1/3", "flex-1 basis-1/3"],

      ["flex-1 basis-full"],

      ["flex-1 basis-full"],
    ],
  },

  {
    name: "Mobile Grid",
    rows: [
      ["flex-1 basis-full"],
    //   ["flex-1 basis-full"],
      ["flex-1 basis-1/2", "flex-1 basis-1/2"],
      ["flex-1 basis-1/3", "flex-1 basis-1/3", "flex-1 basis-1/3"],
      ["flex-1 basis-1/2", "flex-1 basis-1/2"],
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
      ["flex-1 basis-full"],

    //   ["flex-1 basis-56", "flex-1 basis-56"],
    //   ["flex-1 basis-1/2", "flex-1 basis-1/2"],
    //   ["flex-1 basis-1/3", "flex-1 basis-1/3", "flex-1 basis-1/3"],

      ["flex-1 basis-full"],
      ["flex-1 basis-full", "flex-1 basis-full", "flex-1 basis-full"],
      ["flex-1 basis-full"],

      ["flex-1 basis-full"],

    //   ["flex-1 basis-56", "flex-1 basis-56"],
    //   ["flex-1 basis-1/2", "flex-1 basis-1/2"],
      ["flex-1 basis-1/3", "flex-1 basis-1/3", "flex-1 basis-1/3"],
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
    <div className="p-8 max-w-3xl w-[900px] h-[600px] overflow-hidden flex flex-col">
      <div
        className={`transition-opacity duration-700 ${
          fadingOut ? "opacity-0" : "opacity-100"
        } flex flex-col gap-4 h-full`}
      >
        {current.rows.slice(0, visible).map((row, i) => (
          <div className="flex gap-4 flex-1">
            {row.map((cls, j) => (
              <div
                key={j}
                className={`shimmer grow ${cls} animate-pulse`}
                style={{ animationDelay: `${i * 150 + j * 300}ms` }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
