import { Search, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type CustomersToolbarProps = {
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  onSearch: () => void;
  onSearchKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onAddCustomer: () => void;
  onAddVisit: () => void;
};

export function CustomersToolbar({
  searchQuery,
  onSearchQueryChange,
  onSearch,
  onSearchKeyDown,
  onAddCustomer,
  onAddVisit,
}: CustomersToolbarProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="mb-3">Customers</h1>
        <p className="text-muted-foreground text-sm">
          Manage your customer base and track engagement
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative w-full max-w-full md:w-80 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(event) => onSearchQueryChange(event.target.value)}
              onKeyDown={onSearchKeyDown}
              className="h-10 pl-10 bg-input border-border focus-visible:ring-accent text-sm text-white"
            />
          </div>
          <Button
            onClick={onSearch}
            variant="outline"
            className="h-10 px-4 border-border text-foreground cursor-pointer hover:text-white font-medium">
            Search
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            onClick={onAddCustomer}
            className="h-10 px-5 bg-accent text-accent-foreground hover:bg-accent/90 font-medium">
            <Plus className="size-4 mr-2" />
            Add Customer
          </Button>
          <Button
            onClick={onAddVisit}
            variant="outline"
            className="h-10 px-5 border-border text-foreground cursor-pointer hover:text-white font-medium ">
            <Plus className="size-4 mr-2" />
            Add Visit
          </Button>
        </div>
      </div>
    </div>
  );
}
