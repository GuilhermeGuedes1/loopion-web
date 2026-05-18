import { useState, useEffect } from "react";
import { Search, Plus, MessageCircle, Eye } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { CustomerDetailsDialog } from "./CustomerDetailsDialog";
import { AddCustomerDialog } from "./AddCustomerDialog";
import { Skeleton } from "./ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { toast } from "sonner";
import { getCustomers } from "../../services/customersApi";
import { CustomerType, MetaType } from "../../types/customers";
import { openWhatsApp } from "../lib/whatsapp";

export function CustomersPage() {
  const [customers, setCustomers] = useState<CustomerType[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [meta, setMeta] = useState<MetaType>({
    limit: 0,
    page: 1,
    total: 0,
    totalPages: 0,
  });

  const loadCustomer = async (page = 1) => {
    setIsLoading(true);
    try {
      const data = await getCustomers(page);
      setCustomers(data.customersWithBusinessRules);

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

  const [isLoading, setIsLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [showNewVisitDialog, setShowNewVisitDialog] = useState(false);
  const [visitCustomerId, setVisitCustomerId] = useState<string>("");
  const [visitDate, setVisitDate] = useState(() =>
    new Date().toISOString().slice(0, 10),
  );
  const [visitDuration, setVisitDuration] = useState("");
  const [visitNotes, setVisitNotes] = useState("");

  useEffect(() => {
    if (showNewVisitDialog && !visitCustomerId) {
      const firstCustomer = customers[0];
      if (firstCustomer) {
        setVisitCustomerId(firstCustomer.id);
      }
    }
  }, [showNewVisitDialog, visitCustomerId, customers]);

  const handlePreviousPage = () => {
    if (meta.page > 1) {
      loadCustomer(meta.page - 1);
    }
  };

  const handleNextPage = () => {
    if (meta.page < meta.totalPages) {
      loadCustomer(meta.page + 1);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-3">Customers</h1>
          <p className="text-muted-foreground text-sm">
            Manage your customer base and track engagement
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="h-10 px-5 bg-accent text-accent-foreground hover:bg-accent/90 font-medium">
            <Plus className="size-4 mr-2" />
            Add Customer
          </Button>
          <Button
            onClick={() => setShowNewVisitDialog(true)}
            variant="outline"
            className="h-10 px-5 border-border text-foreground hover:bg-muted/50 font-medium">
            <Plus className="size-4 mr-2" />
            Add Visit
          </Button>
        </div>
      </div>

      <Card className="border-border bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-5">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">All Customers</CardTitle>
              <CardDescription className="text-sm mt-1">
                customers found
              </CardDescription>
            </div>
            <div className="relative w-80">
              <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search customers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 pl-10 bg-input border-border focus-visible:ring-accent text-sm"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border border-border/60 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-border/60">
                  <TableHead className="w-[22%] text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Name
                  </TableHead>

                  <TableHead className="w-[14%] text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Phone
                  </TableHead>

                  <TableHead className="w-[16%] text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Last Visit
                  </TableHead>

                  <TableHead className="w-[16%] text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Created At
                  </TableHead>

                  <TableHead className="w-[14%] text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Days Since Visit
                  </TableHead>

                  <TableHead className="w-[14%] text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    City
                  </TableHead>

                  <TableHead className="w-[14%] text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    State
                  </TableHead>

                  <TableHead className="w-[14%] text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Country
                  </TableHead>

                  <TableHead className="w-[12%] text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Status
                  </TableHead>

                  <TableHead className="w-[12%] text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {isLoading
                  ? // show 6 skeleton rows while loading
                    Array.from({ length: 6 }).map((_, i) => (
                      <TableRow key={i} className="border-border/60">
                        <TableCell>
                          <Skeleton className="h-4 w-40" />
                        </TableCell>

                        <TableCell className="text-muted-foreground text-sm">
                          <Skeleton className="h-4 w-24" />
                        </TableCell>

                        <TableCell className="text-sm">
                          <Skeleton className="h-4 w-28" />
                        </TableCell>

                        <TableCell className="text-sm">
                          <Skeleton className="h-4 w-28" />
                        </TableCell>

                        <TableCell className="text-sm">
                          <Skeleton className="h-4 w-20" />
                        </TableCell>

                        <TableCell className="text-sm">
                          <Skeleton className="h-4 w-24" />
                        </TableCell>

                        <TableCell className="text-sm">
                          <Skeleton className="h-4 w-12" />
                        </TableCell>

                        <TableCell className="text-sm">
                          <Skeleton className="h-4 w-16" />
                        </TableCell>

                        <TableCell>
                          <Skeleton className="h-4 w-20" />
                        </TableCell>

                        <TableCell className="text-right">
                          <Skeleton className="h-6 w-24 ml-auto" />
                        </TableCell>
                      </TableRow>
                    ))
                  : customers?.map((customer) => (
                      <TableRow
                        key={customer.id}
                        className={
                          customer.canContact
                            ? "bg-accent/5 hover:bg-accent/10 border-border/60"
                            : "hover:bg-muted/30 border-border/60"
                        }>
                        <TableCell>
                          <div>
                            <p className="font-medium text-sm">
                              {customer.name}
                            </p>

                            <p className="text-xs text-muted-foreground mt-0.5">
                              {customer.email}
                            </p>
                          </div>
                        </TableCell>

                        <TableCell className="text-muted-foreground text-sm">
                          {customer.phone}
                        </TableCell>

                        <TableCell className="text-sm">
                          {customer.lastVisitAt ? (
                            new Date(customer.lastVisitAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              },
                            )
                          ) : (
                            <span className="text-muted-foreground">
                              No visits yet
                            </span>
                          )}
                        </TableCell>

                        <TableCell className="text-sm">
                          {customer.createdAt ? (
                            new Date(customer.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              },
                            )
                          ) : (
                            <span className="text-muted-foreground">N/A</span>
                          )}
                        </TableCell>

                        <TableCell className="text-sm">
                          {customer.lastVisitAt ? (
                            Math.max(
                              0,
                              Math.floor(
                                (Date.now() -
                                  new Date(customer.lastVisitAt).getTime()) /
                                  (1000 * 60 * 60 * 24),
                              ),
                            ) + " days"
                          ) : (
                            <span className="text-muted-foreground">N/A</span>
                          )}
                        </TableCell>

                        <TableCell className="text-sm">
                          {customer.city}
                        </TableCell>

                        <TableCell className="text-sm">
                          {customer.state}
                        </TableCell>

                        <TableCell className="text-sm">
                          {customer.country}
                        </TableCell>

                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={
                              customer.canContact
                                ? "text-xs bg-accent/10 text-accent border-accent/20"
                                : "text-xs"
                            }>
                            {customer.canContact ? "Needs Contact" : "Active"}
                          </Badge>
                        </TableCell>

                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setSelectedCustomer(customer)}
                              className="h-8 w-8 p-0">
                              <Eye className="size-4" />
                            </Button>

                            {customer.canContact === true && (
                              <Button
                                size="sm"
                                onClick={() =>
                                  openWhatsApp(customer.phone, customer.name)
                                }
                                className="h-8 bg-accent text-accent-foreground hover:bg-accent/90 cursor-pointer">
                                <MessageCircle className="size-3.5 mr-1.5" />
                                WhatsApp
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              Showing {customers.length} of {meta.total} customers (Page{" "}
              {meta.page} of {meta.totalPages})
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={meta.page <= 1}
                onClick={handlePreviousPage}
                className="h-9 text-xs">
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={meta.page >= meta.totalPages}
                onClick={handleNextPage}
                className="h-9 text-xs">
                Next
              </Button>
            </div>
          </div>
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
        onCreated={loadCustomer}
      />

      <Dialog open={showNewVisitDialog} onOpenChange={setShowNewVisitDialog}>
        <DialogContent className="border-border bg-card/95 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle>Record New Visit</DialogTitle>
            <DialogDescription className="text-sm mt-1">
              Add a visit for a customer from the list.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 mt-2">
            <div className="space-y-2">
              <Label htmlFor="visit-customer" className="text-foreground/70">
                Customer
              </Label>
              <Select
                value={visitCustomerId}
                onValueChange={setVisitCustomerId}>
                <SelectTrigger
                  id="visit-customer"
                  className="h-11 bg-input border-border focus-visible:ring-accent">
                  <SelectValue placeholder="Select a customer" />
                </SelectTrigger>
                <SelectContent className="border-border bg-popover">
                  {customers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="visit-date" className="text-foreground/70">
                Visit Date
              </Label>
              <Input
                id="visit-date"
                type="date"
                value={visitDate}
                onChange={(event) => setVisitDate(event.target.value)}
                className="h-11 bg-input border-border focus-visible:ring-accent"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="visit-duration" className="text-foreground/70">
                Duration
              </Label>
              <Input
                id="visit-duration"
                placeholder="e.g., 45 min"
                value={visitDuration}
                onChange={(event) => setVisitDuration(event.target.value)}
                className="h-11 bg-input border-border focus-visible:ring-accent"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="visit-notes" className="text-foreground/70">
                Notes
              </Label>
              <Input
                id="visit-notes"
                placeholder="Add any notes about this visit"
                value={visitNotes}
                onChange={(event) => setVisitNotes(event.target.value)}
                className="h-11 bg-input border-border focus-visible:ring-accent"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                className="flex-1 h-11 border-border/60 hover:bg-muted/50"
                onClick={() => setShowNewVisitDialog(false)}>
                Cancel
              </Button>
              <Button
                className="flex-1 h-11 bg-accent text-accent-foreground hover:bg-accent/90 font-medium"
                onClick={() => {
                  if (!visitCustomerId) {
                    toast.error(
                      "Please select a customer before saving the visit.",
                    );
                    return;
                  }

                  toast.success("Visit recorded successfully.");
                  setShowNewVisitDialog(false);
                  setVisitDuration("");
                  setVisitNotes("");
                  setVisitDate(new Date().toISOString().slice(0, 10));
                }}>
                Save Visit
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
