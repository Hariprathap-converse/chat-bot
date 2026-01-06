import EmployeeDetails from "@/client/dynamic-form/employee-details";

interface EmployeeDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EmployeeDetailsModal({
  isOpen,
  onClose,
}: EmployeeDetailsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex h-full items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Modal container */}
      <div
        className="relative z-10 !max-w-[1200px] w-[1200px] h-fit overflow-auto max-h-[80%] p-0 mr-4 bg-background shadow-xl rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <EmployeeDetails onCancel={onClose} />
      </div>
    </div>
  );
}

interface SkeletonLoaderModalProps {
  isOpen: boolean;
}

export function SkeletonLoaderModal({ isOpen }: SkeletonLoaderModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex h-full items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Skeleton Loader with AI Scan */}
      <div className="relative z-10 max-w-[1200px] w-[1200px] h-fit bg-background shadow-xl rounded-lg p-3">
        {/* AI Scan Effect */}
        <div className="relative h-[490px] rounded-lg border border-border/40 bg-muted/40 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent,rgba(120,120,255,.18),transparent)] animate-[scan_1.6s_linear_infinite]" />

          {/* Form Fields Skeleton */}
          <div className="absolute inset-0 p-6 space-y-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-accent/30 rounded" />
                  <div className="h-10 w-full bg-accent/20 rounded" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-accent/30 rounded" />
                  <div className="h-10 w-full bg-accent/20 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
