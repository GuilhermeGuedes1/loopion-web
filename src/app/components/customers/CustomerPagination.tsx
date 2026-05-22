import { Button } from "../ui/button";
import { MetaType } from "../../../types/customers";

type CustomerPaginationProps = {
  meta: MetaType;
  visibleCount: number;
  onPrevious: () => void;
  onNext: () => void;
};

export function CustomerPagination({
  meta,
  visibleCount,
  onPrevious,
  onNext,
}: CustomerPaginationProps) {
  return (
    <div className="mt-5 flex items-center justify-between">
      <p className="text-xs text-muted-foreground">
        Showing {visibleCount} of {meta.total} customers (Page {meta.page} of {meta.totalPages})
      </p>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={meta.page <= 1}
          onClick={onPrevious}
          className="h-9 text-xs">
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={meta.page >= meta.totalPages}
          onClick={onNext}
          className="h-9 text-xs">
          Next
        </Button>
      </div>
    </div>
  );
}
