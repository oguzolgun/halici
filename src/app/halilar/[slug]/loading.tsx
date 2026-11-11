import { Container } from "@/components/ui/Container";
import { Skeleton } from "@/components/ui/Skeleton";

export default function ProductDetailLoading() {
  return (
    <Container className="py-12">
      <Skeleton className="mb-8 h-5 w-64" />
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Skeleton className="aspect-[2/3] w-full" />
        </div>
        <div className="lg:col-span-6 space-y-5">
          <Skeleton className="h-6 w-36" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-12 w-full rounded-full" />
        </div>
      </div>
    </Container>
  );
}
