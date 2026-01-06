import { Skeleton } from "@/components/ui/skeleton";

export default function EmployeeDetailsSkeleton() {
  return (
    <div className="h-full rounded-lg relative p-[2px] 2xl:ml-2 bg-background">
      <div className="flex">
        <div className="bg-parentbackground w-[60px] rounded-tl-sm flex items-center justify-center">
          <Skeleton className=" w-6 h-6 animate-pulse bg-muted" />
        </div>
        <div className="h-[72px] rounded-tr-md flex-1 flex items-center bg-mainbackground">
          <div className="pl-4 w-full">
            <Skeleton className="mb-2 h-7 w-3/5 rounded-md" />
            <Skeleton className="h-5 w-2/5 rounded-md animate-pulse bg-muted" />
          </div>
        </div>
      </div>

      <div className="main-container relative h-[82%] overflow-auto mx-auto px-4 pt-2 pb-2 md:pb-0">
        <div className="grid grid-cols-3 gap-4">
          {[...Array(9)].map((_, i) => (
            <Skeleton
              key={i}
              className="h-10 rounded-md animate-pulse bg-muted"
            />
          ))}
          <div className="fixed bottom-0 w-[95%]  mt-4 h-[70px] px-4 py-2 flex items-center justify-between  rounded-b-md">
            <Skeleton className="ml-[20px] h-8 w-[80px] rounded-md animate-pulse bg-muted" />
            <div className="flex  items-center gap-10 pr-[30px]">
              <Skeleton className="h-5  w-[20px] rounded-full animate-pulse  bg-muted " />
              <Skeleton className="h-8  w-[100px] rounded-md animate-pulse  bg-muted " />
              <Skeleton className="h-8  w-[100px] rounded-md animate-pulse  bg-muted " />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
