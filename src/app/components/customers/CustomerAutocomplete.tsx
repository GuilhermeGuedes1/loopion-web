import { useEffect, useState } from "react";
import { ChevronsUpDown } from "lucide-react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { api } from "../../../services/axios";

type CustomerOption = {
  id: string;
  name: string;
  lastName?: string | null;
  email?: string | null;
  phone?: string | null;
};

type Props = {
  value: string;
  onChange: (id: string) => void;
};

export function CustomerCombobox({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [customers, setCustomers] = useState<CustomerOption[]>([]);
  const [selectedCustomer, setSelectedCustomer] =
    useState<CustomerOption | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!value) {
      setSelectedCustomer(null);
    }
  }, [value]);

  useEffect(() => {
    if (!open) return;

    const timeout = setTimeout(async () => {
      try {
        setLoading(true);

        const response = await api.get<CustomerOption[]>("/customers/search", {
          params: {
            search,
          },
        });

        setCustomers(response.data);
      } catch (error) {
        console.error("Error searching customers:", error);
        setCustomers([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [search, open]);

  function handleSelect(customer: CustomerOption) {
    setSelectedCustomer(customer);
    onChange(customer.id);
    setSearch("");
    setOpen(false);
  }

  const selectedCustomerName = selectedCustomer
    ? `${selectedCustomer.name} ${selectedCustomer.lastName ?? ""}`.trim()
    : "";

  return (
    <div className="relative w-full">
      <Button
        type="button"
        variant="outline"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full h-11 justify-between border-border bg-input hover:bg-input">
        <span className="truncate">
          {selectedCustomerName || "Type name, email or phone"}
        </span>

        <ChevronsUpDown className="h-4 w-4 opacity-50 shrink-0" />
      </Button>

      {open && (
        <div className="absolute top-full left-0 z-[99999] mt-2 w-full rounded-md border border-border bg-popover shadow-lg">
          <div className="p-2 border-b border-border">
            <Input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                onChange("");
              }}
              placeholder="Search customer..."
              autoFocus
              className="h-10 bg-input border-border focus-visible:ring-accent"
            />
          </div>

          <div className="max-h-60 overflow-y-auto">
            {loading ? (
              <div className="p-3 text-sm text-muted-foreground">
                Loading...
              </div>
            ) : customers.length === 0 ? (
              <div className="p-3 text-sm text-muted-foreground">
                No customers found.
              </div>
            ) : (
              customers.map((customer) => {
                const fullName = `${customer.name} ${
                  customer.lastName ?? ""
                }`.trim();

                return (
                  <button
                    key={customer.id}
                    type="button"
                    onClick={() => handleSelect(customer)}
                    className="w-full px-3 py-2 text-left hover:bg-muted/50 transition-colors">
                    <div className="text-sm font-medium">{fullName}</div>

                    <div className="text-xs text-muted-foreground">
                      {customer.email ?? customer.phone}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
