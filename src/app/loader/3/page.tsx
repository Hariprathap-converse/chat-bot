"use client";
import { useEffect, useState } from "react";
import { NavChatBot } from "@/Icons/global/home";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Generation stage configuration interface
 */
interface GenerationStage {
  stage: string;
  messages: string[];
}

/**
 * AI generation stages with progressive messages
 */
const generationStages: GenerationStage[] = [
  {
    stage: "Analyzing Requirements",
    messages: [
      "Understanding your website needs...",
      "Identifying key features and components...",
      "Planning the structure...",
    ],
  },
  {
    stage: "Designing Layout",
    messages: [
      "Creating responsive grid system...",
      "Designing navigation patterns...",
      "Optimizing for mobile and desktop...",
    ],
  },
  {
    stage: "Building Components",
    messages: [
      "Generating hero section...",
      "Creating content blocks...",
      "Adding interactive elements...",
    ],
  },
  {
    stage: "Styling Interface",
    messages: [
      "Applying color schemes...",
      "Adding animations and transitions...",
      "Ensuring accessibility standards...",
    ],
  },
  {
    stage: "Finalizing",
    messages: [
      "Optimizing performance...",
      "Testing responsiveness...",
      "Your website is ready!",
    ],
  },
];

export default function AIWebsiteGeneratorLoader() {
  const [currentStage, setCurrentStage] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [elapsed, setElapsed] = useState(0);

  const stageDone = (i: number) => currentStage > i;
  const stageActive = (i: number) => currentStage === i;
  const stage = generationStages[currentStage];
  const message = stage.messages[currentMessage];

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!isCompleted) {
      const startTime = Date.now();
      interval = setInterval(() => {
        setElapsed((Date.now() - startTime) / 1000);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isCompleted]);

  // Smooth message progression without typing animation
  useEffect(() => {
    if (isCompleted) return;

    const timeout = setTimeout(() => {
      if (currentMessage < stage.messages.length - 1) {
        setCurrentMessage((prev) => prev + 1);
      } else if (currentStage < generationStages.length - 1) {
        setCurrentStage((prev) => prev + 1);
        setCurrentMessage(0);
      } else {
        // All stages complete
        setIsCompleted(true);
      }
    }, 1200); // Show each message for 1.2 seconds

    return () => clearTimeout(timeout);
  }, [currentMessage, currentStage, isCompleted, stage.messages.length]);

  const progress = isCompleted
    ? 100
    : ((currentStage * 3 + currentMessage + 1) /
      (generationStages.length * 3)) *
    100;

  /**
   * Handle preview button click - opens generated site in new tab
   */
  const handlePreview = () => {
    // TODO: Replace with actual generated site URL/port
    window.open('http://localhost:3001', '_blank');
  };


  // Don't render if closed
  if (!isVisible) {
    return null;
  }


  return (
    <>
      {/* Container - Refactored for Compact Inline Display */}
      <div className="w-full bg-card rounded-2xl shadow-lg border border-border/50 overflow-hidden animate-in fade-in zoom-in duration-500 my-2">
        {/* Header - Compact with Preview Button in Heading */}
        <div className="bg-linear-to-r from-accent/10 via-accent/5 to-transparent px-5 py-3 border-b border-border/50">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-linear-to-br from-[#7468FC] via-[#ED799C] to-[#918FFF] flex items-center justify-center shadow-md">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div className="absolute inset-0 rounded-full bg-linear-to-br from-[#7468FC] to-[#918FFF] blur-md opacity-40 animate-pulse" />
                </div>
                <div className="">
                  <h1 className="bg-[linear-gradient(90deg,#7468FC_1.11%,#ED799C_43.64%,#918FFF_99.05%)] bg-clip-text text-transparent font-semibold text-lg leading-tight">
                    AI Website Generator
                  </h1>
                  <p className="text-xs text-muted-foreground font-medium">
                    {isCompleted ? "Generation Complete" : stage.stage}
                  </p>
                </div>
              </div>

              {/* Preview Button positioned in Header when completed */}
              {isCompleted && (
                <button
                  onClick={handlePreview}
                  className="px-3 py-1.5 bg-primary text-primary-foreground text-xs rounded-md cursor-pointer font-medium hover:opacity-90 transition-opacity flex items-center gap-1.5 shadow-sm animate-in fade-in slide-in-from-right-4"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  Preview
                </button>
              )}
            </div>


            {/* Progress Bar - Compact */}
            <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-[#7468FC] via-[#ED799C] to-[#918FFF] transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Content Area - Removed max-h and auto-scroll */}
        <div className="p-4 bg-muted/5 min-h-[459px] overflow-auto max-h-[460px]">
          {isCompleted ? (
            // Enhanced Completion State with Taller Preview
            <div className="space-y-4 h-full flex flex-col justify-center">
              {/* Website Preview Mockup - Taller */}
              <div
                className="bg-card rounded-xl p-4 border border-border/50 animate-in fade-in slide-in-from-bottom-4 duration-700 shadow-sm flex-1 flex flex-col"
                style={{ animationDelay: "300ms", minHeight: "360px" }}
              >
                <div className="flex items-center gap-2 mb-3 shrink-0">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 bg-muted rounded h-4 flex items-center px-2">
                    <span className="text-[10px] text-muted-foreground">
                      https://your-website.com
                    </span>
                  </div>
                </div>

                {/* Website Preview - Expanded Height */}
                <div className="bg-background rounded-lg p-3 space-y-3 border border-border/30 flex-1 flex flex-col overflow-hidden">
                  {/* Header */}
                  <div className="h-8 bg-linear-to-r from-accent/20 to-accent/10 rounded flex items-center px-3 gap-3 shrink-0">
                    <div className="h-3 w-16 bg-accent/30 rounded" />
                    <div className="flex-1" />
                    <div className="flex gap-2">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="h-2 w-10 bg-accent/20 rounded"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Hero - Expanded */}
                  <div className="h-40 bg-linear-to-br from-accent/20 to-accent/5 rounded flex flex-col items-center justify-center gap-3 p-4 shrink-0">
                    <div className="h-6 w-3/4 bg-accent/30 rounded" />
                    <div className="h-3 w-1/2 bg-accent/20 rounded" />
                    <div className="flex gap-2 mt-2">
                      <div className="h-6 w-20 bg-accent/40 rounded-md" />
                      <div className="h-6 w-20 bg-accent/40 rounded-md" />
                    </div>
                  </div>

                  {/* Content Grid - Expanded to fill remaining space */}
                  <div className="grid grid-cols-3 gap-3 flex-1">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="bg-accent/10 rounded p-2 space-y-2 h-full flex flex-col"
                      >
                        <div className="h-8 bg-accent/20 rounded shrink-0" />
                        <div className="h-2 bg-accent/15 rounded shrink-0" />
                        <div className="h-2 w-2/3 bg-accent/15 rounded shrink-0" />
                        <div className="flex-1 bg-accent/5 rounded mt-1" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Time Display Below Preview Panel */}
              <div className="flex justify-between items-center text-[10px] text-muted-foreground font-bold uppercase tracking-widest px-1">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Completed
                </span>
                <span className="font-mono">
                  {elapsed.toFixed(1)}s
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-3 pb-2">
              {/* ================= NAV ================= */}
              <AISection visible={currentStage >= 0}>
                <section>
                  <HeaderLabel
                    active={stageActive(0)}
                    done={stageDone(0)}
                    activeText={message}
                    doneText="Navigation & Structure"
                  />


                  <div className="relative h-12 rounded-lg border border-border/40 bg-zinc-50/50 dark:bg-zinc-900/50 overflow-hidden">
                    {stageActive(0) && <AIScan />}

                    <div className="absolute inset-0 flex items-center justify-between px-4">
                      <div
                        className={cn(
                          "h-5 w-24 rounded bg-accent/30 transition-all duration-500",
                          stageDone(0) || currentMessage >= 1
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-95"
                        )}
                      />

                      <div className="flex gap-2">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className={cn(
                              "h-3 w-10 rounded bg-accent/20 transition-all duration-500",
                              stageDone(0) || currentMessage >= 2
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-1"
                            )}
                            style={{ transitionDelay: `${i * 80}ms` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              </AISection>

              {/* ================= HERO ================= */}
              <AISection visible={currentStage >= 1}>
                <section>
                  <HeaderLabel
                    active={stageActive(1)}
                    done={stageDone(1)}
                    activeText={message}
                    doneText="Hero Section"
                  />

                  <div className="relative h-32 rounded-lg border border-border/40 bg-zinc-50/50 dark:bg-zinc-900/50 overflow-hidden">
                    {stageActive(1) && <AIRadial />}

                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6">
                      <div
                        className={cn(
                          "h-8 w-3/4 rounded bg-accent/30 transition-all duration-500",
                          stageDone(1) || currentMessage >= 0
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-2"
                        )}
                      />
                      <div
                        className={cn(
                          "h-4 w-1/2 rounded bg-accent/20 transition-all duration-500 delay-100",
                          stageDone(1) || currentMessage >= 1
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-2"
                        )}
                      />
                      <div className="flex gap-2 mt-1">
                        <div
                          className={cn(
                            "h-6 w-20 rounded bg-accent/40 transition-all duration-500 delay-100",
                            stageDone(1) || currentMessage >= 2
                              ? "opacity-100 translate-y-0"
                              : "opacity-0 translate-y-2"
                          )}
                        />
                        <div
                          className={cn(
                            "h-6 w-20 rounded bg-accent/40 transition-all duration-500 delay-100",
                            stageDone(1) || currentMessage >= 2
                              ? "opacity-100 translate-y-0"
                              : "opacity-0 translate-y-2"
                          )}
                        />                      </div>
                    </div>
                  </div>
                </section>
              </AISection>

              {/* ================= CONTENT ================= */}
              <AISection visible={currentStage >= 2}>
                <section>
                  <HeaderLabel
                    active={stageActive(2)}
                    done={stageDone(2)}
                    activeText={message}
                    doneText="Content Blocks"
                  />

                  <div className="grid grid-cols-3 gap-3">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className={cn(
                          "relative h-28 rounded-lg border border-border/40 bg-zinc-50/50 dark:bg-zinc-900/50 overflow-hidden transition-all duration-500",
                          stageDone(2) || currentMessage >= i
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-2"
                        )}
                        style={{ transitionDelay: `${i * 120}ms` }}
                      >
                        <div className="absolute inset-0 p-3 space-y-2">
                          <div className="h-10 rounded bg-accent/30" />
                          <div className="h-4 w-3/4 rounded bg-accent/20" />
                          <div className="h-4 w-1/2 rounded bg-accent/15" />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </AISection>

              {/* ================= FOOTER ================= */}
              <AISection visible={currentStage >= 3}>
                <section>
                  <HeaderLabel
                    active={stageActive(3)}
                    done={isCompleted}
                    activeText={message}
                    doneText="Footer & Finalizing"
                  />

                  <div className="h-16 rounded-lg border border-border/40 bg-zinc-50/50 dark:bg-zinc-900/50 flex items-center justify-between px-4">
                    <div className="h-5 w-20 rounded bg-accent/30" />
                    <div className="flex gap-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="space-y-1.5">
                          <div className="h-3 w-12 rounded bg-accent/20" />
                          <div className="h-2 w-8 rounded bg-accent/15" />
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </AISection>
            </div>
          )}
        </div>

        {/* Footer with Timer - Hide when completed */}
        {!isCompleted && (
          <div className="bg-muted/30 px-5 py-2.5 border-t border-border/50 flex justify-between items-center text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
            <span className="flex items-center gap-1.5">
              <span
                className={cn(
                  "w-1.5 h-1.5 rounded-full",
                  "bg-[#7468FC] animate-pulse"
                )}
              />
              AI Processing
            </span>
            <span className="font-mono">
              {elapsed.toFixed(1)}s
            </span>
          </div>
        )}

        <style jsx>{`
          @keyframes shimmer {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
          .animate-shimmer {
            animation: shimmer 2s infinite;
          }
        `}</style>
      </div >
    </>
  );
}

/**
 * Props interface for HeaderLabel component
 */
interface HeaderLabelProps {
  active: boolean;
  done: boolean;
  activeText: string;
  doneText: string;
}

/**
 * HeaderLabel component displaying stage status
 */
function HeaderLabel({ active, done, activeText, doneText }: HeaderLabelProps) {
  return (
    <div className="flex items-center gap-2 mb-1.5">
      <NavChatBot className="w-4 h-4" />
      <span className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">
        {active ? activeText : doneText}
      </span>
    </div>
  );
}

function AIScan() {
  return (
    <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent,rgba(120,120,255,.18),transparent)] animate-[scan_1.6s_linear_infinite]" />
  );
}

function AIRadial() {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(130,130,255,.18),transparent_70%)] animate-[scan_1.6s_linear_infinite]" />
  );
}

type AISectionProps = {
  visible: boolean;
  children: React.ReactNode;
};

function AISection({ visible, children }: AISectionProps) {
  return (
    <div
      className={cn(
        "transition-all duration-700 ease-out",
        visible
          ? "opacity-100 translate-y-0 max-h-[400px]"
          : "opacity-0 translate-y-3 max-h-0 pointer-events-none"
      )}
    >
      {children}
    </div>
  );
}
