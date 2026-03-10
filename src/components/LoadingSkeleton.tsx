import { Skeleton } from '@/components/ui/skeleton';

export const CardSkeleton = () => (
  <div className="glass-card rounded-2xl p-6 space-y-4">
    <Skeleton className="h-5 w-3/4 bg-muted" />
    <Skeleton className="h-4 w-1/2 bg-muted" />
    <Skeleton className="h-4 w-full bg-muted" />
    <Skeleton className="h-4 w-2/3 bg-muted" />
  </div>
);

export const CardGridSkeleton = ({ count = 6 }: { count?: number }) => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: count }).map((_, i) => (
      <CardSkeleton key={i} />
    ))}
  </div>
);

export const StatSkeleton = () => (
  <div className="glass-card-glow rounded-2xl p-6 space-y-3">
    <div className="flex items-center gap-2">
      <Skeleton className="h-5 w-5 rounded bg-muted" />
      <Skeleton className="h-4 w-20 bg-muted" />
    </div>
    <Skeleton className="h-8 w-16 bg-muted" />
  </div>
);

export const DetailSkeleton = () => (
  <div className="glass-card-glow max-w-2xl rounded-2xl p-8 space-y-4">
    <Skeleton className="h-8 w-2/3 bg-muted" />
    <div className="flex gap-4">
      <Skeleton className="h-4 w-24 bg-muted" />
      <Skeleton className="h-4 w-24 bg-muted" />
      <Skeleton className="h-4 w-32 bg-muted" />
    </div>
    <Skeleton className="h-4 w-full bg-muted" />
    <Skeleton className="h-4 w-full bg-muted" />
    <Skeleton className="h-4 w-3/4 bg-muted" />
  </div>
);
