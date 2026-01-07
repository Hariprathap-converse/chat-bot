"use client";
import { useEffect, useState, useRef } from "react";
import { NavChatBot } from "@/Icons/global/home";
import { cn } from "@/lib/utils";

interface GenerationStage {
  stage: string;
  messages: string[];
}

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
      "Creating grid system...",
      "Designing navigation...",
      "Optimizing layout...",
    ],
  },
  {
    stage: "Building Components",
    messages: [
      "Generating hero...",
      "Creating blocks...",
      "Adding interactions...",
    ],
  },
  {
    stage: "Styling Interface",
    messages: [
      "Applying colors...",
      "Adding animations...",
      "Ensuring access...",
    ],
  },
  {
    stage: "Finalizing",
    messages: ["Optimizing...", "Testing...", "Ready!"],
  },
];

export default function AIWebsiteGeneratorLoader({
  setGenLoader,
  onPopupClose,
}: {
  setGenLoader?: (value: boolean) => void;
  onPopupClose?: () => void;
}) {
  const [currentStage, setCurrentStage] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);

  const stageDone = (i: number) => currentStage > i;
  const stageActive = (i: number) => currentStage === i;
  const stage = generationStages[currentStage];
  const message = stage.messages[currentMessage];

  useEffect(() => {
    if (isCompleted) return;

    const timeout = setTimeout(() => {
      if (currentMessage < stage.messages.length - 1) {
        setCurrentMessage((prev) => prev + 1);
      } else if (currentStage < generationStages.length - 1) {
        setCurrentStage((prev) => prev + 1);
        setCurrentMessage(0);
      } else {
        setIsCompleted(true);
      }
    }, 1200);

    return () => clearTimeout(timeout);
  }, [currentMessage, currentStage, isCompleted, stage.messages.length]);

  useEffect(() => {
    if (!isPopupOpen && isCompleted && containerRef.current) {
      setTimeout(() => {
        containerRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }, 100);
    }
  }, [isPopupOpen, isCompleted]);

  const progress = isCompleted
    ? 100
    : ((currentStage * 3 + currentMessage + 1) /
        (generationStages.length * 3)) *
      100;

  const handlePreview = () => {
    window.open("http://localhost:3001", "_blank");
  };

  const handleClose = () => {
    setIsPopupOpen(false);
    if (setGenLoader) {
      setGenLoader(false);
    }

    setTimeout(() => {
      if (onPopupClose) {
        onPopupClose();
      }
    }, 100);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <>
      {/* Wrapper to handle Popup (Fixed) vs Inline (Relative) positioning */}
      <div
        ref={containerRef}
        className={cn(
          "transition-all duration-300 ease-in-out",
          isPopupOpen
            ? "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in"
            : "contents",
        )}
      >
        {/* Popup/Modal Container */}
        <div
          className={cn(
            "bg-card text-card-foreground overflow-hidden flex flex-col transition-all duration-300 ease-in-out",

            isPopupOpen
              ? "max-w-4xl w-full rounded-2xl shadow-xl border border-border/50"
              : "w-full max-w-[450px] my-2 rounded-xl shadow-md border border-border/60",
          )}
        >
          {/* Header */}
          <div
            className={cn(
              "bg-linear-to-r from-accent/10 via-accent/5 to-transparent border-b border-border/50 shrink-0",
              isPopupOpen ? "p-6" : "p-3",
            )}
          >
            <div
              className={cn(
                "space-y-3 transition-all duration-300",
                isPopupOpen ? "text-left" : "flex items-center gap-3 space-y-0",
              )}
            >
              <div
                className={cn(
                  "flex items-center transition-all duration-300",
                  isPopupOpen ? "justify-start gap-4" : "justify-start gap-2",
                )}
              >
                <div className="relative shrink-0 transition-all duration-300">
                  <div
                    className={cn(
                      "rounded-full bg-linear-to-br from-[#7468FC] via-[#ED799C] to-[#918FFF] flex items-center justify-center shadow-md transition-all duration-300",
                      isPopupOpen ? "w-10 h-10" : "w-8 h-8",
                    )}
                  >
                    <svg
                      className={cn(
                        "text-white transition-all duration-300",
                        isPopupOpen ? "w-5 h-5" : "w-4 h-4",
                      )}
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
                  <div className="absolute inset-0 rounded-full bg-linear-to-br from-[#7468FC] to-[#918FFF] blur-lg opacity-30 animate-pulse" />
                </div>
                <h1
                  className={cn(
                    "bg-[linear-gradient(90deg,#7468FC_1.11%,#ED799C_43.64%,#918FFF_99.05%)] bg-clip-text text-transparent font-semibold leading-tight transition-all duration-300",
                    isPopupOpen ? "text-2xl" : "text-base",
                  )}
                >
                  AI Website Generator
                </h1>
              </div>

              {/* Progress Bar - Only visible in popup or if incomplete */}
              {(isPopupOpen || !isCompleted) && (
                <div
                  className={cn(
                    "w-full bg-muted rounded-full overflow-hidden transition-all duration-300",
                    isPopupOpen ? "h-1.5 mt-3" : "h-1 w-24 ml-auto",
                  )}
                >
                  <div
                    className="h-full bg-linear-to-r from-[#7468FC] via-[#ED799C] to-[#918FFF] transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}

              {/* Status Text - Visible mainly in popup */}
              <p
                className={cn(
                  "text-muted-foreground font-medium transition-all duration-300",
                  isPopupOpen ? "text-sm block" : "hidden",
                )}
              >
                {isCompleted ? "Generation Complete" : stage.stage}
              </p>
            </div>
          </div>

          {/* Content Area */}
          <div
            className={cn(
              "overflow-y-auto transition-all duration-300 scrollbar-thin scrollbar-thumb-accent/10 scrollbar-track-transparent bg-background/50",

              isPopupOpen
                ? "p-6 min-h-[470px] max-h-[550px]"
                : "p-2 h-auto w-full",
            )}
          >
            {isCompleted ? (
              <div
                className={cn(
                  "space-y-4",
                  !isPopupOpen && "flex flex-col h-full",
                )}
              >
                {/* Website Preview Mockup */}
                <div
                  className={cn(
                    "bg-muted/20 rounded-xl border border-border/40 animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-hidden",

                    isPopupOpen
                      ? "p-4 h-[400px]"
                      : "p-0 border-0 max-h-[300px]  rounded-lg mb-0",
                  )}
                  style={{ animationDelay: "150ms" }}
                >
                  {/* Browser Toolbar */}
                  <div className="flex items-center gap-2 mb-3 px-1">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                    </div>
                    <div className="flex-1 bg-muted/60 rounded py-1 px-3">
                      <span className="text-[10px] text-muted-foreground block truncate">
                        https://your-website.com
                      </span>
                    </div>
                  </div>

                  {/* Website Preview Content (Skeleton) */}
                  <div
                    className={cn(
                      isPopupOpen ? "h-[90%]" : "h-[85%]",
                      "bg-background rounded-lg p-3 space-y-3 border border-border/30  overflow-hidden shadow-xs",
                    )}
                  >
                    {/* Header */}
                    <div className="h-8 bg-linear-to-r from-accent/20 to-accent/10 rounded flex items-center px-3 gap-3">
                      <div className="h-5 w-16 bg-accent/30 rounded animate-pulse" />
                      <div className="flex-1" />
                      <div className="flex gap-2">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className={cn(
                              "bg-accent/20 rounded animate-pulse",
                              isPopupOpen ? "h-3 w-10" : "h-2 w-8",
                            )}
                            style={{ animationDelay: `${i * 100}ms` }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Hero Section */}
                    <div
                      className={cn(
                        "bg-linear-to-br from-accent/20 to-accent/5 rounded flex flex-col items-center justify-center gap-2 p-3 transition-all",
                        isPopupOpen ? "h-40" : "h-20",
                      )}
                    >
                      <div
                        className={cn(
                          "bg-accent/30 rounded animate-pulse",
                          isPopupOpen ? "h-10 w-2/3" : "h-5 w-2/3",
                        )}
                      />
                      <div
                        className={cn(
                          "bg-accent/20 rounded animate-pulse delay-100",
                          isPopupOpen ? "h-4 w-1/2" : "h-2 w-1/2",
                        )}
                        style={{ animationDelay: "200ms" }}
                      />

                      {/* Hero Buttons - Only show in larger view or scaled down */}
                      <div
                        className={cn(
                          "flex gap-2 mt-1",
                          !isPopupOpen && "hidden",
                        )}
                      >
                        <div
                          className="h-8 w-20 bg-accent/40 rounded-md animate-pulse"
                          style={{ animationDelay: "400ms" }}
                        />
                        <div
                          className="h-8 w-20 bg-accent/40 rounded-md animate-pulse"
                          style={{ animationDelay: "600ms" }}
                        />
                      </div>
                    </div>

                    {/* Content Grid */}
                    <div
                      className={cn(
                        "grid grid-cols-3",
                        isPopupOpen ? "gap-4" : "gap-2",
                      )}
                    >
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className={cn(
                            "bg-accent/10 rounded p-2 space-y-1.5",
                            isPopupOpen ? "h-32" : "h-20",
                          )}
                        >
                          <div
                            className={cn(
                              "bg-accent/20 rounded animate-pulse",
                              isPopupOpen ? "h-12" : "h-8",
                            )}
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

                {/* Action Buttons */}
                <div
                  className={cn(
                    "flex items-center gap-3 pt-2",
                    isPopupOpen
                      ? "justify-center"
                      : "justify-center flex-col sm:flex-row",
                  )}
                >
                  <button
                    onClick={handlePreview}
                    className={cn(
                      isPopupOpen ? "text-sm" : "text-xs",
                      "w-full sm:w-auto px-4 py-2 bg-primary text-primary-foreground  rounded-md cursor-pointer font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-sm",
                    )}
                  >
                    <svg
                      className="w-4 h-4"
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
                    Open Preview
                  </button>
                  {isPopupOpen && (
                    <button
                      onClick={handleClose}
                      className="w-full sm:w-auto px-4 py-2 bg-secondary text-secondary-foreground text-sm rounded-md cursor-pointer font-medium hover:bg-secondary/80 transition-colors border border-border/50"
                    >
                      Close & Embed
                    </button>
                  )}
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

                      <div className="absolute inset-0 flex items-center justify-between px-4">
                        <div
                          className={cn(
                            "h-8 w-32 rounded bg-accent/30 transition-all duration-500",
                            stageDone(0) || currentMessage >= 1
                              ? "opacity-100 scale-100"
                              : "opacity-40 scale-95",
                          )}
                        />

                        <div className="flex gap-2">
                          {[1, 2, 3, 4].map((i) => (
                            <div
                              key={i}
                              className={cn(
                                "h-6 w-16 rounded bg-accent/20 transition-all duration-500",
                                stageDone(0) || currentMessage >= 2
                                  ? "opacity-100 translate-y-0"
                                  : "opacity-0 translate-y-1",
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
                      doneText="Hero generated ✓"
                    />

                    <div className="relative h-48 rounded-lg border border-border/40 bg-muted/40 overflow-hidden">
                      {stageActive(1) && <AIRadial />}

                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6">
                        <div
                          className={cn(
                            "h-12 w-3/4 rounded bg-accent/30 transition-all duration-500",
                            stageDone(1) || currentMessage >= 0
                              ? "opacity-100 translate-y-0"
                              : "opacity-0 translate-y-2",
                          )}
                        />
                        <div
                          className={cn(
                            "h-6 w-1/2 rounded bg-accent/20 transition-all duration-300 delay-100",
                            stageDone(1) || currentMessage >= 1
                              ? "opacity-100 translate-y-0"
                              : "opacity-0 translate-y-2",
                          )}
                        />
                        <div className="flex gap-2 mt-1">
                          <div
                            className={cn(
                              "h-6 w-16 rounded bg-accent/20 transition-all duration-300 delay-100",
                              stageDone(1) || currentMessage >= 1
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-2",
                            )}
                          />
                          <div
                            className={cn(
                              "h-6 w-16 rounded bg-accent/20 transition-all duration-300 delay-100",
                              stageDone(1) || currentMessage >= 1
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-2",
                            )}
                          />
                        </div>
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
                      doneText="Content structured"
                    />

                    <div className="grid grid-cols-3 gap-2">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className={cn(
                            "relative h-40 rounded-lg border border-border/40 bg-muted/40 overflow-hidden transition-all duration-500",
                            stageDone(2) || currentMessage >= i
                              ? "opacity-100 translate-y-0"
                              : "opacity-0 translate-y-2",
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
                <AISection visible={currentStage >= 3}>
                  <section>
                    <HeaderLabel
                      active={stageActive(3)}
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
            {/* Current Progress Indicator - Only show if incomplete */}
            {!isCompleted && (
              <div className="flex items-center gap-3 py-4 animate-in fade-in duration-300">
                <NavChatBot className="w-5 h-5" />
                <div className="flex gap-1">
                  <div
                    className="w-[5px] h-[5px] rounded-full bg-accent-foreground animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <div
                    className="w-[5px] h-[5px] rounded-full bg-accent-foreground animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <div
                    className="w-[5px] h-[5px] rounded-full bg-accent-foreground animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Footer - Hide if completed */}
          {!isCompleted && (
            <div className="bg-muted/30 px-5 py-3 border-t border-border/50 shrink-0">
              <div className="flex items-center justify-center gap-4 text-xs font-medium text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      isCompleted
                        ? "bg-green-500"
                        : "bg-linear-to-r from-[#7468FC] to-[#918FFF]"
                    } animate-pulse`}
                  />
                  <span className="text-sub-title">
                    {isCompleted ? "Completed" : "AI Processing"}
                  </span>
                </div>
                <div className="h-3 w-px bg-border" />
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      isCompleted
                        ? ""
                        : "bg-linear-to-r from-[#ED799C] to-[#918FFF]"
                    } animate-pulse`}
                  />
                  <span className="text-sub-title">
                    {isCompleted ? "" : "Building Components"}
                  </span>
                </div>
              </div>
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
        </div>
      </div>
    </>
  );
}

interface HeaderLabelProps {
  active: boolean;
  done: boolean;
  activeText: string;
  doneText: string;
}

function HeaderLabel({ active, done, activeText, doneText }: HeaderLabelProps) {
  return (
    <div className="flex items-center gap-2 mb-1.5 text-foreground">
      <NavChatBot className="w-5 h-5" />
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
        "transition-all duration-500 ease-out",
        visible
          ? "opacity-100 translate-y-0 max-h-[400px]"
          : "opacity-0 translate-y-3 max-h-0 pointer-events-none",
      )}
    >
      {children}
    </div>
  );
}
