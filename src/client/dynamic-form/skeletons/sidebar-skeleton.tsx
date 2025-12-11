import { Skeleton } from '@/components/ui/skeleton'

export default function SidebarSkeleton() {
  return (
    <div className="w-[70px] h-full flex flex-col p-4 space-y-4">
      <Skeleton className="h-9 mb-5 rounded-md bg-muted" />
      <Skeleton className="h-9 rounded-md bg-muted" />
      <Skeleton className="h-9 rounded-md bg-muted" />
      <Skeleton className="h-9 rounded-md bg-muted" />
      <Skeleton className="h-9 rounded-md bg-muted" />
      <Skeleton className="h-9 rounded-md bg-muted" />
    </div>
  )
}
