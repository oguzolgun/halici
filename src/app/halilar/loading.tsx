import { Container } from "@/components/ui/Container";
import { ProductGridSkeleton, Skeleton } from "@/components/ui/Skeleton";

export default function CatalogLoading() {
  return (
    <Container className="py-12 space-y-8">
      <div className="space-y-3">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-10 w-80" />
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="hidden lg:col-span-3 lg:block">
          <Skeleton className="h-[520px] w-full" />
        </div>
        <div className="lg:col-span-9">
          <ProductGridSkeleton count={6} />
        </div>
      </div>
    </Container>
  );
}
