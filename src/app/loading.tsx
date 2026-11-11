import { Container } from "@/components/ui/Container";
import { ProductGridSkeleton, Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="py-12">
      <Container className="space-y-10">
        <div className="space-y-4">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-5 w-96 max-w-full" />
        </div>
        <Skeleton className="h-[420px] w-full" />
        <ProductGridSkeleton count={6} />
      </Container>
    </div>
  );
}
