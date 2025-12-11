import { Skeleton } from '@/components/ui/skeleton'

export default function HeaderSkeleton() {
  return (
    <div className="flex justify-center ml-20 gap-2 items-center pr-[10px]">
      <Skeleton className="h-6 w-6 rounded-full animate-pulse bg-muted " />
      <Skeleton className="h-6 w-6 rounded-full animate-pulse bg-muted " />
      <Skeleton className="h-6 w-6 rounded-full animate-pulse bg-muted " />
      <Skeleton className="h-6 w-6 rounded-full animate-pulse bg-muted " />
      <Skeleton className="h-6 w-6 rounded-full animate-pulse bg-muted " />
      <Skeleton className="h-6 w-6 rounded-full animate-pulse bg-muted " />
      <Skeleton className="h-6 w-6 rounded-full animate-pulse bg-muted " />
      <Skeleton className="h-6 w-6 rounded-full animate-pulse bg-muted " />
      <div className="flex gap-[15px] sm:gap-[21px] items-center justify-center">
        <div className="relative pt-2">
          {/* <Skeleton className="absolute top-1 -right-1 w-4 h-4 rounded-fullanimate-pulse" />
          <Skeleton className="w-6 h-6 roundedanimate-pulse" /> */}
        </div>
        {/* <Skeleton className="w-[30px] h-[30px] rounded-fullanimate-pulse " /> */}
      </div>
    </div>
  )
}
