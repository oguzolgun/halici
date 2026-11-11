interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-[14px] bg-sand/70 ${className}`}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col rounded-[14px] border border-line bg-ivory-soft p-3">
      <Skeleton className="aspect-[2/3] w-full rounded-[10px]" />
      <div className="mt-3.5 space-y-2 px-1">
        <Skeleton className="h-3 w-20 rounded-full" />
        <Skeleton className="h-5 w-3/4 rounded-md" />
        <Skeleton className="h-3 w-1/2 rounded-md" />
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-5 w-24 rounded-md" />
          <Skeleton className="h-4 w-10 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, idx) => (
        <ProductCardSkeleton key={idx} />
      ))}
    </div>
  );
}
