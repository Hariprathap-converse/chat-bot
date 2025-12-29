"use client";
import { useEffect, useState } from "react";
import { NavChatBot } from "@/Icons/global/home";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

// AI generation stages with messages
const generationStages = [
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
  const stageDone = (i: number) => currentStage > i;
  const stageActive = (i: number) => currentStage === i;
  const stage = generationStages[currentStage];
  const message = stage.messages[currentMessage];

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

  return (
    <>
      {/* Popup/Modal Container */}
      <div className="max-w-4xl w-full bg-card rounded-3xl  shadow-2xl border-2 border-border/50 overflow-hidden animate-in fade-in zoom-in duration-500">
        {/* Header */}
        <div className="bg-linear-to-r from-accent/10 via-accent/5 to-transparent p-6 border-b border-border/50">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-linear-to-br from-[#7468FC] via-[#ED799C] to-[#918FFF] flex items-center justify-center shadow-lg">
                  <svg
                    className="w-7 h-7 text-white"
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
                <div className="absolute inset-0 rounded-full bg-linear-to-br from-[#7468FC] to-[#918FFF] blur-xl opacity-40 animate-pulse" />
              </div>
              <h1 className="bg-[linear-gradient(90deg,#7468FC_1.11%,#ED799C_43.64%,#918FFF_99.05%)] bg-clip-text text-transparent font-semibold text-4xl">
                AI Website Generator
              </h1>
            </div>

            <p className="text-sub-heading text-lg font-medium">
              {isCompleted ? "Generation Complete!" : stage.stage}
            </p>

            {/* Progress Bar */}
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-[#7468FC] via-[#ED799C] to-[#918FFF] transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="text-sm text-sub-title font-medium">
              {Math.round(progress)}% Complete
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 min-h-[500px] max-h-[50vh] overflow-y-auto">
          {isCompleted ? (
            // Enhanced Completion State
            <div className="space-y-1">
              {/* Success Header */}

              {/* Website Preview Mockup */}
              <div
                className="bg-muted/30 rounded-2xl p-6 border border-border/50 animate-in fade-in slide-in-from-bottom-4 duration-700"
                style={{ animationDelay: "300ms" }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 bg-muted rounded-md h-6 flex items-center px-3">
                    <span className="text-xs text-sub-title">
                      https://your-website.com
                    </span>
                  </div>
                </div>

                {/* Website Preview */}
                <div className="bg-background rounded-lg p-4 space-y-3 border border-border/30">
                  {/* Header */}
                  <div className="h-12 bg-linear-to-r from-accent/20 to-accent/10 rounded flex items-center px-4 gap-4">
                    <div className="h-6 w-24 bg-accent/30 rounded animate-pulse" />
                    <div className="flex-1" />
                    <div className="flex gap-3">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="h-4 w-16 bg-accent/20 rounded animate-pulse"
                          style={{ animationDelay: `${i * 100}ms` }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Hero */}
                  <div className="h-32 bg-linear-to-br from-accent/20 to-accent/5 rounded flex flex-col items-center justify-center gap-2 p-4">
                    <div className="h-8 w-2/3 bg-accent/30 rounded animate-pulse" />
                    <div
                      className="h-4 w-1/2 bg-accent/20 rounded animate-pulse"
                      style={{ animationDelay: "200ms" }}
                    />
                    <div className="flex gap-2 mt-2">
                      <div
                        className="h-8 w-24 bg-accent/40 rounded-lg animate-pulse"
                        style={{ animationDelay: "400ms" }}
                      />
                      <div
                        className="h-8 w-24 bg-accent/40 rounded-lg animate-pulse"
                        style={{ animationDelay: "600ms" }}
                      />
                    </div>
                  </div>

                  {/* Content Grid */}
                  <div className="grid grid-cols-3 gap-3">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="h-24 bg-accent/10 rounded p-2 space-y-2"
                      >
                        <div
                          className="h-12 bg-accent/20 rounded animate-pulse"
                          style={{ animationDelay: `${i * 100}ms` }}
                        />
                        <div
                          className="h-2 bg-accent/15 rounded animate-pulse"
                          style={{ animationDelay: `${i * 150}ms` }}
                        />
                        <div
                          className="h-2 w-2/3 bg-accent/15 rounded animate-pulse"
                          style={{ animationDelay: `${i * 200}ms` }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {/* ================= NAV ================= */}
              <AISection visible={currentStage >= 0}>
                <section>
                  <HeaderLabel
                    active={stageActive(0)}
                    done={stageDone(0)}
                    activeText={message}
                    doneText="Navigation locked ✓"
                  />

                  <div className="relative h-16 rounded-lg border border-border/40 bg-muted/40 overflow-hidden">
                    {stageActive(0) && <AIScan />}

                    <div className="absolute inset-0 flex items-center justify-between px-6">
                      <div
                        className={cn(
                          "h-8 w-32 rounded bg-accent/30 transition-all duration-500",
                          stageDone(0) || currentMessage >= 1
                            ? "opacity-100 scale-100"
                            : "opacity-40 scale-95"
                        )}
                      />

                      <div className="flex gap-4">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className={cn(
                              "h-6 w-16 rounded bg-accent/20 transition-all duration-500",
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
              <AISection visible={currentStage >= 2}>
                <section>
                  <HeaderLabel
                    active={stageActive(2)}
                    done={stageDone(2)}
                    activeText={message}
                    doneText="Hero generated ✓"
                  />

                  <div className="relative h-48 rounded-lg border border-border/40 bg-muted/40 overflow-hidden">
                    {stageActive(2) && <AIRadial />}

                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-8">
                      <div
                        className={cn(
                          "h-12 w-3/4 rounded bg-accent/30 transition-all duration-500",
                          stageDone(2) || currentMessage >= 0
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-2"
                        )}
                      />
                      <div
                        className={cn(
                          "h-6 w-1/2 rounded bg-accent/20 transition-all duration-500 delay-100",
                          stageDone(2) || currentMessage >= 1
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-2"
                        )}
                      />
                    </div>
                  </div>
                </section>
              </AISection>

              {/* ================= CONTENT ================= */}
              <AISection visible={currentStage >= 3}>
                <section>
                  <HeaderLabel
                    active={stageActive(3)}
                    done={stageDone(3)}
                    activeText={message}
                    doneText="Content structured ✓"
                  />

                  <div className="grid grid-cols-3 gap-4">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className={cn(
                          "relative h-40 rounded-lg border border-border/40 bg-muted/40 overflow-hidden transition-all duration-500",
                          stageDone(3) || currentMessage >= i
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-2"
                        )}
                        style={{ transitionDelay: `${i * 120}ms` }}
                      >
                        <div className="absolute inset-0 p-4 space-y-2">
                          <div className="h-20 rounded bg-accent/30" />
                          <div className="h-4 w-3/4 rounded bg-accent/20" />
                          <div className="h-3 w-1/2 rounded bg-accent/15" />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </AISection>

              {/* ================= FOOTER ================= */}
              <AISection visible={currentStage >= 4}>
                <section>
                  <HeaderLabel
                    active={stageActive(4)}
                    done={isCompleted}
                    activeText={message}
                    doneText="Finalized ✓"
                  />

                  <div className="h-24 rounded-lg border border-border/40 bg-muted/40 flex items-center justify-between px-6">
                    <div className="h-8 w-24 rounded bg-accent/30" />
                    <div className="flex gap-6">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="space-y-2">
                          <div className="h-4 w-20 rounded bg-accent/20" />
                          <div className="h-3 w-16 rounded bg-accent/15" />
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </AISection>
            </div>
          )}
          {/* Current Progress Indicator */}
          {!isCompleted && (
            <div className="flex items-center gap-3 py-4 animate-in fade-in duration-300">
              <NavChatBot />
              <div className="flex gap-1">
                <div
                  className="w-[6px] h-[6px] rounded-full bg-accent-foreground animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <div
                  className="w-[6px] h-[6px] rounded-full bg-accent-foreground animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <div
                  className="w-[6px] h-[6px] rounded-full bg-accent-foreground animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
              <span className="text-sm text-sub-title animate-pulse">
                {message}
              </span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-muted/30 px-6 py-4 border-t border-border/50">
          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  isCompleted
                    ? "bg-green-500"
                    : "bg-linear-to-r from-[#7468FC] to-[#918FFF]"
                } animate-pulse`}
              />
              <span className="text-sub-title">
                {isCompleted ? "Complete" : "AI Processing"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  isCompleted
                    ? "bg-green-500"
                    : "bg-linear-to-r from-[#ED799C] to-[#918FFF]"
                } animate-pulse`}
              />
              <span className="text-sub-title">
                {isCompleted ? "Ready" : "Building Components"}
              </span>
            </div>
          </div>
        </div>

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
      </div>
    </>
  );
}

function HeaderLabel({ active, done, activeText, doneText }: any) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <NavChatBot />
      <span className="text-xs font-medium text-sub-heading">
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
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(130,130,255,.18),transparent_70%)] animate-pulse" />
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
          ? "opacity-100 translate-y-0 max-h-[600px]"
          : "opacity-0 translate-y-3 max-h-0 pointer-events-none"
      )}
    >
      {children}
    </div>
  );
}
