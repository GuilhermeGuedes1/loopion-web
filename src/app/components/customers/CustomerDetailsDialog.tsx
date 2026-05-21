import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { MessageCircle, Phone, Mail, Calendar, TrendingUp } from "lucide-react";

interface CustomerDetailsDialogProps {
  customer: any;
  open: boolean;
  onClose: () => void;
}

export function CustomerDetailsDialog({
  customer,
  open,
  onClose,
}: CustomerDetailsDialogProps) {
  if (!customer) return null;

  const visitHistory = [
    { date: customer.lastVisit, notes: "Regular checkup", duration: "45 min" },
    {
      date: new Date(customer.lastVisit.getTime() - 14 * 24 * 60 * 60 * 1000),
      notes: "Follow-up visit",
      duration: "30 min",
    },
    {
      date: new Date(customer.lastVisit.getTime() - 28 * 24 * 60 * 60 * 1000),
      notes: "Initial consultation",
      duration: "60 min",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl border-border bg-card/95 backdrop-blur-xl">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl">{customer.name}</DialogTitle>
              <DialogDescription className="mt-1.5 text-sm">
                Customer since March 2025
              </DialogDescription>
            </div>
            <Badge
              variant="secondary"
              className={
                customer.needsContact
                  ? "ml-4 bg-accent/10 text-accent border-accent/20"
                  : "ml-4"
              }>
              {customer.needsContact ? "Needs Contact" : "Active"}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-2">
          <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-muted/30 border border-border/40">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-sm">
                <Phone className="size-4 text-muted-foreground" />
                <span className="text-foreground/80 font-mono">
                  {customer.phone}
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <Mail className="size-4 text-muted-foreground" />
                <span className="text-foreground/80">{customer.email}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-sm">
                <Calendar className="size-4 text-muted-foreground" />
                <span className="text-foreground/80">
                  Last visit: {customer.daysSinceVisit} days ago
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <TrendingUp className="size-4 text-muted-foreground" />
                <span className="text-foreground/80">
                  {customer.totalVisits} total visits
                </span>
              </div>
            </div>
          </div>

          <Separator className="bg-border/40" />

          <div>
            <h3 className="mb-5 text-base">Visit History</h3>
            <div className="space-y-5">
              {visitHistory.map((visit, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center pt-1">
                    <div className="size-2 rounded-full bg-accent" />
                    {index < visitHistory.length - 1 && (
                      <div className="w-px h-full bg-border/60 mt-2" />
                    )}
                  </div>
                  <div className="flex-1 pb-2">
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-sm font-medium">
                        {visit.date.toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <span className="text-xs text-muted-foreground font-mono">
                        {visit.duration}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {visit.notes}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator className="bg-border/40" />

          <div className="flex gap-3 pt-2">
            {customer.needsContact && (
              <Button className="flex-1 h-11 bg-accent text-accent-foreground hover:bg-accent/90 font-medium">
                <MessageCircle className="size-4 mr-2" />
                Send WhatsApp Message
              </Button>
            )}
            <Button
              variant="outline"
              className="flex-1 h-11 border-border/60 hover:bg-muted/50">
              <Calendar className="size-4 mr-2" />
              Schedule Visit
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
