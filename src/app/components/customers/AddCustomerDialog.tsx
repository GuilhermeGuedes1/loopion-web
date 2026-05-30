import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { toast } from "sonner";
import { createCustomer } from "../../../services/customersApi";
import { formatPhone, onlyNumbers } from "../../../utils/phone";

export interface AddCustomerFormValues {
  name: string;
  lastName: string;
  email: string;
  city: string;
  state: string;
  country: string;
  phone: string;
}

interface AddCustomerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated: () => void;
}

export function AddCustomerDialog({
  open,
  onOpenChange,
  onCreated,
}: AddCustomerDialogProps) {
  const form = useForm<AddCustomerFormValues>({
    mode: "onTouched",
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      city: "",
      state: "",
      country: "Brasil",
      phone: "",
    },
  });

  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open]);

  const onSubmit = async (values: AddCustomerFormValues) => {
    try {
      await createCustomer({
        ...values,
        phone: onlyNumbers(values.phone),
      });

      onCreated();
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to create customer", error);
      toast.error(
        "Unable to create customer. Please check the data and try again.",
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl border-border bg-card/95 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle>Add Customer</DialogTitle>
          <DialogDescription className="max-w-md">
            Fill in the new customer details and submit.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                rules={{
                  required: "First name is required",
                  minLength: { value: 2, message: "Minimum 2 characters" },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Rafael" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                rules={{
                  required: "Last name is required",
                  minLength: { value: 2, message: "Minimum 2 characters" },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Ferreira" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="rafaelferreira@gmail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                rules={{
                  required: "Phone is required",
                  pattern: {
                    value: /^[0-9]{10,}$/,
                    message: "Phone must be at least 10 digits",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="(21) 99912-3456"
                        value={formatPhone(field.value)}
                        onChange={(event) => {
                          field.onChange(onlyNumbers(event.target.value));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                rules={{
                  required: "City is required",
                  minLength: { value: 2, message: "Minimum 2 characters" },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Nova Iguaçu" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                rules={{ required: "State is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="input h-10 w-full rounded-md border px-3 py-2">
                        <option value="">Select state</option>
                        <option value="AC">AC</option>
                        <option value="AL">AL</option>
                        <option value="AP">AP</option>
                        <option value="AM">AM</option>
                        <option value="BA">BA</option>
                        <option value="CE">CE</option>
                        <option value="DF">DF</option>
                        <option value="ES">ES</option>
                        <option value="GO">GO</option>
                        <option value="MA">MA</option>
                        <option value="MT">MT</option>
                        <option value="MS">MS</option>
                        <option value="MG">MG</option>
                        <option value="PA">PA</option>
                        <option value="PB">PB</option>
                        <option value="PR">PR</option>
                        <option value="PE">PE</option>
                        <option value="PI">PI</option>
                        <option value="RJ">RJ</option>
                        <option value="RN">RN</option>
                        <option value="RS">RS</option>
                        <option value="RO">RO</option>
                        <option value="RR">RR</option>
                        <option value="SC">SC</option>
                        <option value="SP">SP</option>
                        <option value="SE">SE</option>
                        <option value="TO">TO</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value || "Brasil"}
                        disabled
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="pt-4">
              <Button
                type="submit"
                className="h-11 w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
                Save Customer
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
