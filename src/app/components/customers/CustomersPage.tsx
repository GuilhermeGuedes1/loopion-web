import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { CustomerDetailsDialog } from "./CustomerDetailsDialog";
import { AddCustomerDialog } from "./AddCustomerDialog";
import { CreateVisitDialog } from "./CreateVisitDialog";
import { CustomersToolbar } from "./CustomersToolbar";
import { CustomersTable } from "./CustomersTable";
import { CustomerPagination } from "./CustomerPagination";
import { getCustomers } from "../../../services/customersApi";
import { CustomerType, MetaType } from "../../../types/customers";
import { openWhatsApp } from "../../../utils/whatsapp";

export function CustomersPage() {
  const [customers, setCustomers] = useState<CustomerType[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [showNewVisitDialog, setShowNewVisitDialog] = useState(false);
  const [meta, setMeta] = useState<MetaType>({
    limit: 0,
    page: 1,
    total: 0,
    totalPages: 0,
  });

  const loadCustomer = async (page = 1, search?: string) => {
    setIsLoading(true);
    try {
      const data = await getCustomers(page, search);
      setCustomers(data.data);

      const responseMeta = Array.isArray(data.meta) ? data.meta[0] : data.meta;
      setMeta(
        responseMeta ?? {
          limit: 0,
          page,
          total: 0,
          totalPages: 0,
        },
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCustomer(1);
  }, []);

  const handleSearch = () => {
    loadCustomer(1, searchQuery);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handlePreviousPage = () => {
    if (meta.page > 1) {
      loadCustomer(meta.page - 1, searchQuery);
    }
  };

  const handleNextPage = () => {
    if (meta.page < meta.totalPages) {
      loadCustomer(meta.page + 1, searchQuery);
    }
  };

  return (
    <div className="space-y-8">
      <CustomersToolbar
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onSearch={handleSearch}
        onSearchKeyDown={handleSearchKeyDown}
        onAddCustomer={() => setIsAddDialogOpen(true)}
        onAddVisit={() => setShowNewVisitDialog(true)}
      />

      <Card className="border-border bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-5">
          <div>
            <CardTitle className="text-lg">All Customers</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <CustomersTable
            customers={customers}
            isLoading={isLoading}
            onSelectCustomer={setSelectedCustomer}
            onOpenWhatsApp={openWhatsApp}
          />

          <CustomerPagination
            meta={meta}
            visibleCount={(customers ?? []).length}
            onPrevious={handlePreviousPage}
            onNext={handleNextPage}
          />
        </CardContent>
      </Card>

      <CustomerDetailsDialog
        customer={selectedCustomer}
        open={!!selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
      />

      <AddCustomerDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onCreated={() => loadCustomer(1, searchQuery)}
      />

      <CreateVisitDialog
        open={showNewVisitDialog}
        onOpenChange={setShowNewVisitDialog}
        customers={customers}
        onCreated={() => loadCustomer(meta.page ?? 1, searchQuery)}
      />
    </div>
  );
}
