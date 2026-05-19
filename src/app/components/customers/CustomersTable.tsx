import { MessageCircle, Eye } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";
import { CustomerType } from "../../../types/customers";

type CustomersTableProps = {
  customers: CustomerType[];
  isLoading: boolean;
  onSelectCustomer: (customer: CustomerType) => void;
  onOpenWhatsApp: (phone: string, name: string) => void;
};

export function CustomersTable({
  customers,
  isLoading,
  onSelectCustomer,
  onOpenWhatsApp,
}: CustomersTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border/60">
      <Table className="min-w-[780px] md:min-w-full">
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
            <TableHead className="hidden md:table-cell w-[16%] text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Created At
            </TableHead>
            <TableHead className="hidden lg:table-cell w-[14%] text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Days Since Visit
            </TableHead>
            <TableHead className="hidden md:table-cell w-[14%] text-xs font-medium text-muted-foreground uppercase tracking-wider">
              City
            </TableHead>
            <TableHead className="hidden lg:table-cell w-[14%] text-xs font-medium text-muted-foreground uppercase tracking-wider">
              State
            </TableHead>
            <TableHead className="hidden xl:table-cell w-[14%] text-xs font-medium text-muted-foreground uppercase tracking-wider">
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
            ? Array.from({ length: 6 }).map((_, i) => (
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
            : customers.map((customer) => (
                <TableRow
                  key={customer.id}
                  className={
                    customer.canContact
                      ? "bg-accent/5 hover:bg-accent/10 border-border/60"
                      : "hover:bg-muted/30 border-border/60"
                  }>
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm">{customer.name}</p>
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
                      new Date(customer.lastVisitAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    ) : (
                      <span className="text-muted-foreground">No visits yet</span>
                    )}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm">
                    {customer.createdAt ? (
                      new Date(customer.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    ) : (
                      <span className="text-muted-foreground">N/A</span>
                    )}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-sm">
                    {customer.lastVisitAt ? (
                      customer.daysSinceLastVisit
                    ) : (
                      <span className="text-muted-foreground">N/A</span>
                    )}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm">
                    {customer.city}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-sm">
                    {customer.state}
                  </TableCell>
                  <TableCell className="hidden xl:table-cell text-sm">
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
                        onClick={() => onSelectCustomer(customer)}
                        className="h-8 w-8 p-0">
                        <Eye className="size-4" />
                      </Button>
                      {customer.canContact === true && (
                        <Button
                          size="sm"
                          onClick={() => onOpenWhatsApp(customer.phone, customer.name)}
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
  );
}
