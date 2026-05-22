import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { CustomerCombobox } from "./CustomerAutocomplete";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { createVisit } from "../../../services/visitsApi";
import { CustomerType } from "../../../types/customers";

type CreateVisitDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customers: CustomerType[];
  onCreated?: () => void | Promise<void>;
};

export function CreateVisitDialog({
  open,
  onOpenChange,
  customers,
  onCreated,
}: CreateVisitDialogProps) {
  const [visitCustomerId, setVisitCustomerId] = useState<string>("");
  const [visitDate, setVisitDate] = useState(() =>
    new Date().toISOString().slice(0, 10),
  );
  const [isSavingVisit, setIsSavingVisit] = useState(false);

  const resetForm = () => {
    setVisitCustomerId("");
    setVisitDate(new Date().toISOString().slice(0, 10));
  };

  const handleSave = async () => {
    if (isSavingVisit) return;

    if (!visitCustomerId) {
      toast.error("Please select a customer before saving the visit.");
      return;
    }

    try {
      setIsSavingVisit(true);

      const [year = 1970, month = 1, day = 1] = visitDate
        .split("-")
        .map(Number);

      const now = new Date();

      const visitedAt = new Date(
        Date.UTC(
          year,
          month - 1,
          day,
          now.getUTCHours(),
          now.getUTCMinutes(),
          now.getUTCSeconds(),
          now.getUTCMilliseconds(),
        ),
      ).toISOString();

      await createVisit({
        customerId: visitCustomerId,
        visitedAt,
      });

      toast.success("Visit recorded successfully.");

      onOpenChange(false);
      resetForm();

      await onCreated?.();
    } catch (error) {
      console.error(error);
      toast.error("Error recording visit. Please try again.");
    } finally {
      setIsSavingVisit(false);
    }
  };

  const handleClose = (nextOpen: boolean) => {
    if (isSavingVisit) return;

    onOpenChange(nextOpen);

    if (!nextOpen) {
      resetForm();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
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
            <CustomerCombobox
              value={visitCustomerId}
              onChange={setVisitCustomerId}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="visit-date" className="text-foreground/70">
              Visit Date
            </Label>

            <Input
              id="visit-date"
              type="date"
              value={visitDate}
              max={new Date().toISOString().slice(0, 10)}
              onChange={(event) => setVisitDate(event.target.value)}
              className="h-11 bg-input border-border focus-visible:ring-accent"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              className="flex-1 h-11 border-border/60 hover:bg-muted/50"
              disabled={isSavingVisit}
              onClick={() => handleClose(false)}>
              Cancel
            </Button>

            <Button
              className="flex-1 h-11 bg-accent text-accent-foreground hover:bg-accent/90 font-medium disabled:cursor-not-allowed disabled:opacity-70"
              disabled={isSavingVisit || !visitCustomerId}
              onClick={handleSave}>
              {isSavingVisit ? "Saving..." : "Save Visit"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
